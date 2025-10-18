'use client'	
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	LanguageType,
	ModelOption,
	MODEL_OPTIONS,
	PresentationConfig,
	ToneType,
	VerbosityType,
} from '../type'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronsUpDown, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import ToolTip from '@/components/ToolTip'
import { t } from 'i18next'

// Types
interface ConfigurationSelectsProps {
	config: PresentationConfig
	onConfigChange: (key: keyof PresentationConfig, value: any) => void
}

type SlideOption =
	| '3'
	| '5'
	| '8'
	| '10'
	| '11'
	| '12'
	| '13'
	| '14'
	| '15'
	| '16'
	| '17'
	| '18'
	| '19'
	| '20'

// Constants
const SLIDE_OPTIONS: SlideOption[] = [
	'3',
	'5',
	'8',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
]

/**
 * 渲染选定组件以进行幻灯片计数
 */
const SlideCountSelect: React.FC<{
	value: string | null
	onValueChange: (value: string) => void
}> = ({ value, onValueChange }) => {
	const { t } = useTranslation('upload')
	const [customInput, setCustomInput] = useState(
		value && !SLIDE_OPTIONS.includes(value as SlideOption) ? value : ''
	)

	const sanitizeToPositiveInteger = (raw: string): string => {
		const digitsOnly = raw.replace(/\D+/g, '')
		if (!digitsOnly) return ''
		// Remove leading zeros
		const noLeadingZeros = digitsOnly.replace(/^0+/, '')
		return noLeadingZeros
	}

	const applyCustomValue = () => {
		const sanitized = sanitizeToPositiveInteger(customInput)
		if (sanitized && Number(sanitized) > 0) {
			onValueChange(sanitized)
		}
	}

	return (
		<Select value={value || ''} onValueChange={onValueChange} name="slides">
			<SelectTrigger
				className="w-32 md:w-[180px] font-instrument_sans font-medium bg-blue-100 border-blue-200 focus-visible:ring-blue-300"
				data-testid="slides-select"
			>
				<SelectValue placeholder="Select Slides" />
			</SelectTrigger>
			<SelectContent className="font-instrument_sans">
				{/* 固定自定义输入框在顶部 */}
				<div
					className="sticky top-0 z-10 bg-white  p-2 border-b"
					onMouseDown={(e) => e.stopPropagation()}
					onPointerDown={(e) => e.stopPropagation()}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center gap-2">
						<Input
							inputMode="numeric"
							pattern="[0-9]*"
							value={customInput}
							onMouseDown={(e) => e.stopPropagation()}
							onPointerDown={(e) => e.stopPropagation()}
							onClick={(e) => e.stopPropagation()}
							onChange={(e) => {
								const next = sanitizeToPositiveInteger(e.target.value)
								setCustomInput(next)
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									applyCustomValue()
								}
							}}
							onBlur={applyCustomValue}
							placeholder="--"
							className="h-8 w-16 px-2 text-sm"
						/>
						<span className="text-sm font-medium">{t('slides')}</span>
					</div>
				</div>

				{/* Hidden item to allow SelectValue to render custom selection */}
				{value && !SLIDE_OPTIONS.includes(value as SlideOption) && (
					<SelectItem value={value} className="hidden">
						{value} {t('slides')}
					</SelectItem>
				)}

				{SLIDE_OPTIONS.map((option) => (
					<SelectItem
						key={option}
						value={option}
						className="font-instrument_sans text-sm font-medium"
						role="option"
					>
						{option} {t('slides')}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

/**
 * 渲染AI模型选择组件
 */
const ModelSelect: React.FC<{
  value: ModelOption | null;
  onValueChange: (value: ModelOption) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: (key: string) => string;
}> = ({ value, onValueChange, open, onOpenChange, t }) => (
  <Popover open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        name="model"
        data-testid="model-select"
        aria-expanded={open}
        className="w-[200px] justify-between font-instrument_sans font-semibold overflow-hidden bg-blue-100 hover:bg-blue-100 border-blue-200 focus-visible:ring-blue-300 border-none"
      >
        <p className="text-sm font-medium truncate">
          {value ? `${value.name} (${value.provider})` : t('selectModel')}
        </p>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[300px] p-0" align="end">
      <Command>
        <CommandInput
          placeholder={t('searchModel')}	
          className="font-instrument_sans"
        />
        <CommandList>
          <CommandEmpty>{t('noModelFound')}</CommandEmpty>
          <CommandGroup>
            {MODEL_OPTIONS.map((model) => (
              <CommandItem
                key={`${model.provider}-${model.name}`}
                value={JSON.stringify(model)}
                role="option"
                onSelect={(currentValue) => {
                  onValueChange(JSON.parse(currentValue));
                  onOpenChange(false);
                }}
                className="font-instrument_sans"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value && value.name === model.name && value.provider === model.provider ? "opacity-100" : "opacity-0"
                  )}
                />
                {model.name}
                <span className="ml-2 text-xs text-gray-500">({model.provider})</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);

/**
 * 渲染语言选择组件
 */
const LanguageSelect: React.FC<{
	value: string | null
	onValueChange: (value: string) => void
	open: boolean
	onOpenChange: (open: boolean) => void
	t: (key: string) => string;
}> = ({ value, onValueChange, open, onOpenChange, t }) => (
	<Popover open={open} onOpenChange={onOpenChange}>
		<PopoverTrigger asChild>
			<Button
				variant="outline"
				role="combobox"
				name="language"
				data-testid="language-select"
				aria-expanded={open}
				className="w-32 md:w-[200px] justify-between font-instrument_sans font-semibold overflow-hidden bg-blue-100 hover:bg-blue-100 border-blue-200 focus-visible:ring-blue-300 border-none"
			>
				<p className="text-sm font-medium truncate">
					{value || t('selectLanguage')}
				</p>
				<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent className="w-[300px] p-0" align="end">
			<Command>
				<CommandInput
					placeholder={t('searchLanguage')}
					className="font-instrument_sans"
				/>
				<CommandList>
					<CommandEmpty>{t('noLanguageFound')}</CommandEmpty>
					<CommandGroup>
						{Object.values(LanguageType).map((language) => (
							<CommandItem
								key={language}
								value={language}
								role="option"
								onSelect={(currentValue) => {
									onValueChange(currentValue)
									onOpenChange(false)
								}}
								className="font-instrument_sans"
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value === language ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{language}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
)

export function ConfigurationSelects({
	config,
	onConfigChange,
}: ConfigurationSelectsProps) {
	const { t } = useTranslation('upload')
	const [openLanguage, setOpenLanguage] = useState(false)
	const [openAdvanced, setOpenAdvanced] = useState(false)
    const [openModel, setOpenModel] = useState(false);
	const [advancedDraft, setAdvancedDraft] = useState({
		tone: config.tone,
		verbosity: config.verbosity,
		instructions: config.instructions,
		includeTableOfContents: config.includeTableOfContents,
		includeTitleSlide: config.includeTitleSlide,
		webSearch: config.webSearch,
	})

	const handleOpenAdvancedChange = (open: boolean) => {
		if (open) {
			setAdvancedDraft({
				tone: config.tone,
				verbosity: config.verbosity,
				instructions: config.instructions,
				includeTableOfContents: config.includeTableOfContents,
				includeTitleSlide: config.includeTitleSlide,
				webSearch: config.webSearch,
			})
		}
		setOpenAdvanced(open)
	}

	const handleSaveAdvanced = () => {
		onConfigChange('tone', advancedDraft.tone)
		onConfigChange('verbosity', advancedDraft.verbosity)
		onConfigChange('instructions', advancedDraft.instructions)
		onConfigChange(
			'includeTableOfContents',
			advancedDraft.includeTableOfContents
		)
		onConfigChange('includeTitleSlide', advancedDraft.includeTitleSlide)
		onConfigChange('webSearch', advancedDraft.webSearch)
		setOpenAdvanced(false)
	}

	return (
		<div className="flex flex-wrap order-1 gap-4 items-center justify-end">
			<SlideCountSelect
				value={config.slides}
				onValueChange={(value) => onConfigChange('slides', value)}
			/>
			<LanguageSelect
				value={config.language}
				onValueChange={(value) => onConfigChange('language', value)}
				open={openLanguage}
				onOpenChange={setOpenLanguage}
				t={t}
			/>
			<ModelSelect
                value={config.model}
                onValueChange={(value) => onConfigChange("model", value)}
                open={openModel}
                onOpenChange={setOpenModel}
				t={t}
            />
			<ToolTip content={t('advancedSettings')}>
				<button
					aria-label={t('advancedSettings')}
					title={t('advancedSettings')}
					type="button"
					onClick={() => handleOpenAdvancedChange(true)}
					className="ml-auto flex items-center gap-2 text-sm underline underline-offset-4  bg-blue-100 hover:bg-blue-100 border-blue-200 focus-visible:ring-blue-300 border-none p-2 rounded-md font-instrument_sans font-medium"
				>
					<SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
				</button>
			</ToolTip>

			<Dialog open={openAdvanced} onOpenChange={handleOpenAdvancedChange}>
				<DialogContent className="max-w-2xl font-instrument_sans flex flex-col max-h-full px-2 py-4 md:p-6">
					<DialogHeader>
						<DialogTitle>{t('advancedSettings')}</DialogTitle>
					</DialogHeader>

					<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-auto">
						{/* Tone */}
						<div className="w-full flex flex-col gap-2">
							<label className="text-sm font-semibold text-gray-700">
								{t('tone')}
							</label>
							<p className="text-xs text-gray-500">
								{t('toneDescription')}
							</p>
							<Select
								value={advancedDraft.tone}
								onValueChange={(value) =>
									setAdvancedDraft((prev) => ({
										...prev,
										tone: value as ToneType,
									}))
								}
							>
								<SelectTrigger className="w-full font-instrument_sans capitalize font-medium bg-blue-100 border-blue-200 focus-visible:ring-blue-300">
									<SelectValue placeholder={t('selectTone')} />
								</SelectTrigger>
								<SelectContent className="font-instrument_sans">
									{Object.values(ToneType).map((tone) => (
										<SelectItem
											key={tone}
											value={tone}
											className="text-sm font-medium capitalize"
										>
											{t(tone)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Verbosity */}
						<div className="w-full flex flex-col gap-2">
							<label className="text-sm font-semibold text-gray-700">
								{t('verbosity')}
							</label>
							<p className="text-xs text-gray-500">
								{t('verbosityDescription')}
							</p>
							<Select
								value={advancedDraft.verbosity}
								onValueChange={(value) =>
									setAdvancedDraft((prev) => ({
										...prev,
										verbosity: value as VerbosityType,
									}))
								}
							>
								<SelectTrigger className="w-full font-instrument_sans capitalize font-medium bg-blue-100 border-blue-200 focus-visible:ring-blue-300">
									<SelectValue placeholder={t('selectVerbosity')} />
								</SelectTrigger>
								<SelectContent className="font-instrument_sans">
									{Object.values(VerbosityType).map((verbosity) => (
										<SelectItem
											key={verbosity}
											value={verbosity}
											className="text-sm font-medium capitalize"
										>
											{t(verbosity)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Toggles */}
						<div className="w-full flex flex-col gap-2 p-3 rounded-md bg-blue-100 border-blue-200">
							<div className="flex items-center justify-between">
								<label className="text-sm font-semibold text-gray-700">
									{t('includeTableOfContents')}
								</label>
								<Switch
									checked={advancedDraft.includeTableOfContents}
									onCheckedChange={(checked) =>
										setAdvancedDraft((prev) => ({
											...prev,
											includeTableOfContents: checked,
										}))
									}
								/>
							</div>
							<p className="text-xs text-gray-600">
								{t('includeTableOfContentsDescription')}
							</p>
						</div>
						<div className="w-full flex flex-col gap-2 p-3 rounded-md bg-blue-100 border-blue-200">
							<div className="flex items-center justify-between">
								<label className="text-sm font-semibold text-gray-700">
									{t('includeTitleSlide')}
								</label>
								<Switch
									checked={advancedDraft.includeTitleSlide}
									onCheckedChange={(checked) =>
										setAdvancedDraft((prev) => ({
											...prev,
											includeTitleSlide: checked,
										}))
									}
								/>
							</div>
							<p className="text-xs text-gray-600">
								{t('includeTitleSlideDescription')}
							</p>
						</div>
						{/* <div className="w-full flex flex-col gap-2 p-3 rounded-md bg-blue-100 border-blue-200">
							<div className="flex items-center justify-between">
								<label className="text-sm font-semibold text-gray-700">{t('webSearch')}</label>
								<Switch
								checked={advancedDraft.webSearch}
								onCheckedChange={(checked) => setAdvancedDraft((prev) => ({ ...prev, webSearch: checked }))}
								/>
							</div>
							<p className="text-xs text-gray-600">{t('webSearchDescription')}</p>
						</div> */}

						{/* Instructions */}
						<div className="w-full sm:col-span-2 flex flex-col gap-2">
							<label className="text-sm font-semibold text-gray-700">
								{t('instructions')}
							</label>
							<p className="text-xs text-gray-500">
								{t('instructionsDescription')}
							</p>
							<Textarea
								value={advancedDraft.instructions}
								rows={4}
								onChange={(e) =>
									setAdvancedDraft((prev) => ({
										...prev,
										instructions: e.target.value,
									}))
								}
								placeholder={t('instructionsExample')}
								className="py-2 px-3 border-2 font-medium text-sm min-h-[100px] max-h-[200px] border-blue-200 focus-visible:ring-offset-0 focus-visible:ring-blue-300"
							/>
						</div>
					</div>

					<DialogFooter className="flex justify-end gap-2 !flex-row ">
						<Button
							variant="outline"
							onClick={() => handleOpenAdvancedChange(false)}
						>
							{t('cancel')}
						</Button>
						<Button
							onClick={handleSaveAdvanced}
							className="bg-[#5141e5] text-white hover:bg-[#5141e5]/90"
						>
							{t('save')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
