function Header({ name }) {
  return (
    <header className="app-header">
      <img src={`${name}.png`} alt={`${name} logo`} className={name.slice(1)} />
      <h1>The {name.slice(1)} Quiz</h1>
    </header>
  );
}

export default Header;
