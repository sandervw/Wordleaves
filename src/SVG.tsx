import { useEffect, useState } from "react";

interface SVGProps {
  name: string;
  className?: string;
  cursor?:
    | "pointer"
    | "default"
    | "grab"
    | "grabbing"
    | "move"
    | "help"
    | "not-allowed";
  props?: Record<string, unknown>;
}

const SVG = ({ name, className, cursor = "pointer", props = {} }: SVGProps) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const SVGClass = className ? `icon ${className}` : `icon`;

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch(`${name}.svg`);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(`Error loading SVG: ${name}.svg`, error);
      }
    };
    fetchSVG();
  }, [name]);

  return (
    <button
      role="img"
      aria-label={`${name} icon`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      className={SVGClass}
      style={{ cursor }}
      {...props}
    />
  );
};

export default SVG;
