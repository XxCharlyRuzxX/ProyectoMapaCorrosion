
export interface CardTransparentProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function CardTransparent({ children, className , title , description , icon}: CardTransparentProps) {
  return (
    <div
      className={`flex flex-col justify-center p-6 h-44 bg-[#161616]/50 border border-white/10 rounded-lg backdrop-blur-md  ${className}`}
    >
      {icon && (
        <div className="flex items-center gap-2 text-gray-300 text-sm font-medium tracking-wide">
          {icon}
          {title}
        </div>
      )}
      <div className="text-3xl font-semibold text-white mt-3">{description}</div>
      {children}
    </div>
  );
}