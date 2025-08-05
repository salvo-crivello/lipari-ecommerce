'use client';

import clsx from 'clsx';
import { LoaderIcon, LucideImageOff } from 'lucide-react';
import Image from 'next/image';
import React, { HtmlHTMLAttributes, useState } from 'react';

type ImageProps = {
	image: string;
	title: string;
	className?: HtmlHTMLAttributes<string>['className'];
};

function ProductImg({ image, title, className }: ImageProps) {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);
	return (
		<>
			{imageLoading && (
				<div className="absolute inset-0 z-10 aspect-square bg-white rounded-xl flex items-center justify-center">
					<LoaderIcon className="w-1/2 h-1/2 text-neutral-200 animate-spin" />
				</div>
			)}

			{!imageError ? (
				<Image
					src={image}
					alt={title}
					width={500}
					height={500}
					className={clsx('object-cover h-full w-full max-h-fit max-w-fit', className)}
					onError={() => {
						setImageError(true);
						setImageLoading(false);
					}}
					onLoad={() => setImageLoading(false)}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			) : (
				<div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center ">
					<LucideImageOff className="w-1/2 h-1/2 text-neutral-200" />
				</div>
			)}
		</>
	);
}

export default ProductImg;
