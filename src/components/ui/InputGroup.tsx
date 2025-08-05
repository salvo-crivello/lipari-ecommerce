'use client';
import { cva, VariantProps } from 'class-variance-authority';
import {
	createContext,
	ElementType,
	forwardRef,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	PropsWithChildren,
	TextareaHTMLAttributes,
	useContext,
	useState,
} from 'react';
import clsx from 'clsx';

import { Eye, EyeClosed } from 'lucide-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Link from 'next/link';
import Icon from './Icon';

const labelVariants = cva('', {
	variants: {
		variant: {
			default: 'leading-none mb-2 text-neutral-500 font-normal',
		},
		size: {
			sm: 'text-2xs',
			md: 'text-xs',
			lg: 'text-sm',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
});

const inputVariants = cva('w-full', {
	variants: {
		variant: {
			default:
				'flex w-full border border-neutral-300 bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 group-hover:ring-1 group-hover:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50',
		},
		sizes: {
			sm: 'text-xs p-2',
			md: 'text-md p-2',
			lg: 'text-md px-6 py-2',
		},
		rounded: {
			full: 'rounded-full',
			lg: 'rounded-lg',
			md: 'rounded-md',
			sm: 'rounded-sm',
			none: 'rounded-none',
		},
		border: {
			all: 'border',
			bottom: 'border-b-1',
		},
	},
	defaultVariants: {
		variant: 'default',
		rounded: 'md',
		sizes: 'md',
		border: 'all',
	},
});

const textareaVariants = cva('focus:outline-none w-full align-top', {
	variants: {
		variant: {
			default:
				'flex  w-full rounded-md border border-neutral-300 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 group-hover:ring-1 group-hover:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
		},
		sizes: {
			sm: 'text-xs p-2',
			md: 'text-sm p-2',
			lg: 'text-md px-6 py-2',
		},
		rounded: {
			lg: 'rounded-lg',
			md: 'rounded-md',
			sm: 'rounded-sm',
			none: 'rounded-none',
		},
		border: {
			all: 'border-1',
			bottom: 'border-b-1',
		},
	},
	defaultVariants: {
		variant: 'default',
		rounded: 'md',
		sizes: 'md',
		border: 'all',
	},
});

const messageVariants = cva('leading-none mt-1', {
	variants: {
		variant: {
			info: 'text-info',
			warning: 'text-warning',
			success: 'text-success',
			error: 'text-error',
		},
		size: {
			sm: 'text-2xs',
			md: 'text-xs',
			lg: 'text-sm',
		},
	},
	defaultVariants: {
		variant: 'error',
		size: 'sm',
	},
});

////////////////////

type LabelVariants = VariantProps<typeof labelVariants>;
type InputVariants = VariantProps<typeof inputVariants>;
type TextareaVariants = VariantProps<typeof textareaVariants>;
type MessageVariants = VariantProps<typeof messageVariants>;
export type ControlledCheckboxProps<T extends FieldValues> = {
	control?: Control<T>;
	name: Path<T>;
	label: string;
	linkLabel: string;
	linkUrl: string;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & LabelVariants & { required?: boolean };
export type InputProps = InputHTMLAttributes<HTMLInputElement> &
	InputVariants & {
		icon?: ElementType;
		iconPos?: 'left' | 'right' | undefined;
	};
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaVariants;

////////////////////

export const InputContext = createContext({
	sync: false,
});

const { Provider: InputGroupProvider } = InputContext;

export const useInputGroup = () => useContext(InputContext);

////////////////////
//INPUT GROUP//
////////////////////

const InputGroup = ({
	children,
	sync = false,
	className,
}: PropsWithChildren<{ sync?: boolean; className?: string }>) => {
	return (
		<InputGroupProvider value={{ sync }}>
			<div className={clsx('w-full bg-background-soft h-fit flex flex-col group', className)}>{children}</div>
		</InputGroupProvider>
	);
};

////////////////////
//LABEL//
////////////////////

const Label = forwardRef<HTMLLabelElement, LabelProps>(function LabelComponent(
	{ children, variant, size, className, required = false, ...props }: LabelProps,
	ref
) {
	return (
		<label ref={ref} className={clsx(labelVariants({ variant, className, size }))} {...props}>
			{children}
			{required && '*'}
		</label>
	);
});

////////////////////
//INPUT TEXT//
////////////////////

const InputText = forwardRef<HTMLInputElement, InputProps>(function FormInputComponent(
	{ variant, sizes, rounded, border, icon: Icon, iconPos = undefined, className, ...props }: InputProps,
	ref
) {
	return (
		<div className="relative w-full">
			{Icon && (
				<Icon
					size="1em"
					className={clsx('absolute top-1/2 -translate-y-1/2', {
						'left-4': iconPos !== 'right',
						'right-4': iconPos === 'right',
					})}
				/>
			)}
			<input
				ref={ref}
				className={clsx(inputVariants({ variant, sizes, rounded, border }), className, {
					'pl-10': Icon && iconPos !== 'right',
				})}
				{...props}
			/>
		</div>
	);
});

////////////////////
//INPUT DROPDOWN//
////////////////////

////////////////////
//INPUT PASSWORD//
////////////////////

const InputPassword = forwardRef<HTMLInputElement, InputProps>(function FormInputComponent(
	{ variant, sizes, rounded, border, className, ...props },
	ref
) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsPasswordVisible((prevState) => !prevState);
	};

	return (
		<div className="relative">
			<input
				ref={ref}
				className={clsx(inputVariants({ variant, sizes, rounded, border }), className)}
				type={isPasswordVisible ? 'text' : 'password'}
				{...props}
			/>
			<Icon
				Icon={isPasswordVisible ? EyeClosed : Eye}
				className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-transparent p-1 hover:bg-black/5 text-neutral-500 hover:text-blue-700 transition-all duration-150 ease-in rounded-full"
				onClick={togglePasswordVisibility}
			/>
		</div>
	);
});

////////////////////
//INPUT TEXTAREA//
////////////////////

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function FormTextareaComponent(
	{ className, variant, sizes, rounded, border, ...props }: TextareaProps,
	ref
) {
	return (
		<textarea
			ref={ref}
			className={clsx('relative w-full', textareaVariants({ variant, sizes, rounded, border }), className)}
			{...props}
		/>
	);
});

////////////////////
//MESSAGE//
////////////////////

const Message = forwardRef<HTMLElement, HTMLAttributes<HTMLSpanElement> & MessageVariants>(function MessageComponent(
	{ children, className, size, variant, ...props },
	ref
) {
	return (
		<span ref={ref} className={clsx(messageVariants({ variant, className, size }))} {...props}>
			{children || '\u00A0' /* Forza lo spazio anche se vuoto */}
		</span>
	);
});

////////////////////
//CHECKBOX//
////////////////////

const CheckboxForm = <T extends FieldValues>({
	name,
	control,
	label,
	linkLabel,
	linkUrl,
}: ControlledCheckboxProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<div className="flex items-center max-sm:items-start gap-4 group">
					<div className="relative flex border-2 border-olamide-grey-medium checked:border-olamide-500 group-hover:border-olamide-500 rounded-sm transition-all p-0.5">
						<input
							checked={value ?? false}
							onChange={onChange}
							required
							type="checkbox"
							id="privacyConsent"
							className="appearance-none w-3 h-3 bg-transparent checked:bg-olamide-500 rounded-sm"
						/>
					</div>
					<label htmlFor="privacyConsent" className="text-2xs leading-snug text-pretty text-foreground-soft">
						{label}
						<Link
							href={linkUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="read our Privacy Policy"
							className="font-semibold text-olamide-contrast hover:underline"
						>
							{linkLabel}
						</Link>
						<span>.</span>
					</label>
				</div>
			)}
		/>
	);
};

////////////////////
//INPUT PHONE//
////////////////////

/// da aggiungere

////////////////////
//INPUT File//
////////////////////

/// da aggiungere ..

////////////////////////////////////////////////////////////

InputGroup.Label = Label;
InputGroup.InputText = InputText;
InputGroup.InputPassword = InputPassword;
InputGroup.Textarea = Textarea;
InputGroup.Message = Message;
InputGroup.CheckboxForm = CheckboxForm;

export { InputGroup };
