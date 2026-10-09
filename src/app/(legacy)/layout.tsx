import '../globals.css';
import SiteFooter from '../../components/SiteFooter';

// Legacy pages (school, journal, tools, glossary, legal) keep their original styling for now.
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<SiteFooter /></>;
}
