export default function Footer() {
  return <footer className="flex flex-col md:flex-row items-center justify-between px-20 py-8 border-t border-white/10 w-full text-[#C4C7C7]">
    <div className="flex items-center gap-6 h-8">
      <p>© 2026 Obsidian Map. All rights reserved.</p>
    </div>
    <div className="flex items-center gap-6">
      <button className="w-24 h-8 rounded"> Soporte</button>
      <button className="w-24 h-8 rounded"> Documentación</button>
    </div>
  </footer>;
}