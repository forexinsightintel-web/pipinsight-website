import './base.css';
import './site.css';
import './theme.css';
import './home.css';
import TfFooter from '../../components/tf/TfFooter';

export default function TfLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<TfFooter /></>;
}
