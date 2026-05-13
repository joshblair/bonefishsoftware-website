interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = true }: Props) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-semibold text-[#00D4FF] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[#CBD5E1] text-lg max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
