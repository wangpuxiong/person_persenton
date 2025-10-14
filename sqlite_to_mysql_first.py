import sqlite3
import mysql.connector
from mysql.connector import errorcode

def migrate_sqlite_to_mysql(sqlite_db_path, mysql_config):
    # 连接SQLite数据库
    sqlite_conn = sqlite3.connect(sqlite_db_path)
    sqlite_cursor = sqlite_conn.cursor()
    
    try:
        # 连接MySQL数据库
        mysql_conn = mysql.connector.connect(**mysql_config)
        mysql_cursor = mysql_conn.cursor()
        
        # 获取SQLite中所有表
        sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = sqlite_cursor.fetchall()
        
        for table in tables:
            table_name = table[0]
            if table_name.startswith('sqlite_'):  # 跳过SQLite系统表
                continue
            
            print(f"迁移表: {table_name}")
            
            # 获取表结构
            sqlite_cursor.execute(f"PRAGMA table_info({table_name})")
            columns = sqlite_cursor.fetchall()
            
            # 创建MySQL表 (修复VARCHAR长度问题)
            create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ("
            for col in columns:
                col_name = col[1]
                col_type = col[2].upper()
                col_notnull = col[3]
                col_default = col[4]
                
                # 处理MySQL关键字
                if col_name in ['key', 'index', 'user']:
                    col_name = f'`{col_name}`'
                
                # SQLite到MySQL类型映射 (指定VARCHAR长度)
                if col_name == 'speaker_note' or col_name == 'content' or col_name == '`content`':
                    mysql_type = 'LONGTEXT'
                elif col_type.startswith('INT'):
                    mysql_type = 'INT'
                elif col_type.startswith('TEXT'):
                    mysql_type = 'TEXT'
                elif col_type.startswith('VARCHAR'):
                    # 提取长度或使用默认长度
                    if '(' in col_type:
                        mysql_type = col_type
                    else:
                        mysql_type = 'VARCHAR(255)'  # 为VARCHAR指定默认长度
                elif col_type.startswith('REAL'):
                    mysql_type = 'FLOAT'
                elif col_type.startswith('DATETIME'):
                    mysql_type = 'DATETIME'
                elif col_type.startswith('BOOLEAN'):
                    mysql_type = 'TINYINT(1)'  # MySQL没有BOOLEAN，用TINYINT(1)代替
                elif col_type.startswith('JSON'):
                    mysql_type = 'JSON'
                else:
                    mysql_type = 'VARCHAR(255)'  # 默认类型
                
                # 处理NOT NULL约束
                not_null = "NOT NULL" if col_notnull else ""
                
                # 处理默认值
                default_val = f"DEFAULT {col_default}" if col_default is not None else ""
                
                create_table_sql += f"{col_name} {mysql_type} {not_null} {default_val}, "
            
            # 移除末尾多余的逗号和空格
            create_table_sql = create_table_sql.rstrip(', ') + ")"
            
            try:
                mysql_cursor.execute(create_table_sql)
            except mysql.connector.Error as err:
                print(f"创建表 {table_name} 失败: {err}")
                print(f"SQL语句: {create_table_sql}")
                continue
            
            # 迁移数据
            sqlite_cursor.execute(f"SELECT * FROM {table_name}")
            rows = sqlite_cursor.fetchall()
            
            if rows:
                placeholders = ', '.join(['%s'] * len(rows[0]))
                insert_sql = f"INSERT INTO {table_name} VALUES ({placeholders})"
                try:
                    mysql_cursor.executemany(insert_sql, rows)
                    mysql_conn.commit()
                    print(f"成功迁移 {len(rows)} 条记录")
                except mysql.connector.Error as err:
                    print(f"插入数据到 {table_name} 失败: {err}")
                    mysql_conn.rollback()
        
        print("数据迁移完成!")
        
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("用户名或密码错误")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("数据库不存在")
        else:
            print(err)
    finally:
        # 关闭连接
        if 'mysql_conn' in locals() and mysql_conn.is_connected():
            mysql_cursor.close()
            mysql_conn.close()
        sqlite_cursor.close()
        sqlite_conn.close()

if __name__ == "__main__":
    # 配置信息
    SQLITE_DB_PATH = "app_data/fastapi.db"  # SQLite数据库文件路径
    MYSQL_CONFIG = {
        'user': 'root',     # MySQL用户名
        'password': '******', # MySQL密码
        'host': 'localhost',         # MySQL主机地址
        'database': 'compare-slides', # 目标MySQL数据库名
        'port': 3306                 # MySQL端口
    }
    
    # 执行迁移
    migrate_sqlite_to_mysql(SQLITE_DB_PATH, MYSQL_CONFIG)
    
