'use client';

export default function PageHeader({ title, subtitle, description }) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-[#FEFBF6] via-[#FBF8F1] to-[#F8F5EE] py-16 md:py-20">
			{/* Decorative background */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-[#5FA8A3]/10 to-[#7EBDB8]/5 blur-3xl" />
				<div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-[#D4A574]/8 to-[#E8C9A0]/5 blur-3xl" />

				{/* Subtle pattern overlay */}
				<div className="absolute inset-0 opacity-[0.02]" style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, #4A3B2C 1px, transparent 0)`,
					backgroundSize: '40px 40px',
				}} />
			</div>

			<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					{/* Subtitle badge */}
					{subtitle && (
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5FA8A3]/20 bg-white/60 px-4 py-2 backdrop-blur-sm">
							<div className="h-2 w-2 rounded-full bg-[#5FA8A3] animate-pulse" />
							<span className="text-sm font-medium text-[#4A3B2C]/80 tracking-wide">
								{subtitle}
							</span>
						</div>
					)}

					{/* Title */}
					<h1
						className="mb-4 text-4xl font-bold leading-tight text-[#4A3B2C] sm:text-5xl md:text-6xl"
						style={{
							fontFamily: "'Crimson Pro', Georgia, serif",
							fontWeight: 600,
						}}
					>
						{title}
					</h1>

					{/* Description */}
					{description && (
						<p
							className="mx-auto max-w-2xl text-base leading-relaxed text-[#4A3B2C]/70 sm:text-lg lg:text-xl"
							style={{
								fontFamily: "'DM Sans', -apple-system, sans-serif",
							}}
						>
							{description}
						</p>
					)}
				</div>
			</div>

			{/* Bottom decorative separator */}
			<div className="absolute bottom-0 left-0 right-0">
				<svg
					className="w-full"
					height="40"
					viewBox="0 0 1440 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
				>
					<path
						d="M0 20C240 8 480 8 720 20C960 32 1200 32 1440 20V40H0V20Z"
						fill="white"
						opacity="0.8"
					/>
				</svg>
			</div>

			{/* Load fonts */}
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
			`}</style>
		</section>
	);
}
