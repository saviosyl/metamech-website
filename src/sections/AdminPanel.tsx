import { useState, useEffect } from 'react';
import { Settings, Save, X, Key, Database } from 'lucide-react';

export default function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [formspreeEndpoint, setFormspreeEndpoint] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check for admin parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === '1';
    
    if (isAdmin) {
      setIsVisible(true);
      // Load saved endpoint
      const savedEndpoint = localStorage.getItem('metamech_formspree_endpoint');
      if (savedEndpoint) {
        setFormspreeEndpoint(savedEndpoint);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('metamech_formspree_endpoint', formspreeEndpoint);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Remove admin parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-xl">
      <div className="glass-card w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Settings size={20} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="font-orbitron text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-sm text-gray-500">Configure MetaMech Settings</p>
          </div>
        </div>

        {/* Formspree Configuration */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-cyan-400" />
              <h3 className="font-medium text-white">Formspree Integration</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Enter your Formspree endpoint URL to enable form submissions.
            </p>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="https://formspree.io/f/YOUR_FORM_ID"
                value={formspreeEndpoint}
                onChange={(e) => setFormspreeEndpoint(e.target.value)}
                className="input-field pl-11 text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Save size={16} />
                Saved!
              </>
            ) : (
              <>
                <Save size={16} />
                Save Configuration
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-medium text-white mb-2">How to set up Formspree:</h4>
          <ol className="text-sm text-gray-500 space-y-1 list-decimal list-inside">
            <li>Create a free account at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">formspree.io</a></li>
            <li>Create a new form</li>
            <li>Copy your form endpoint URL</li>
            <li>Paste it above and click Save</li>
          </ol>
        </div>

        {/* Close hint */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Remove ?admin=1 from URL to hide this panel
        </p>
      </div>
    </div>
  );
}
