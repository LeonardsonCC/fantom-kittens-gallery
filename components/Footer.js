export default function Footer() {
  return (
    <div className="w-full text-center is-dark text-white">
      <p>
        Hello, this was created by{" "}
        <a
          href="https://github.com/LeonardsonCC"
          target="_blank"
          rel="noreferrer"
          className="nes-text is-primary"
        >
          me
        </a>
        .
      </p>
      <p>
        The whole source of this site is on{" "}
        <a
          href="https://github.com/LeonardsonCC/fantom-kittens-gallery"
          target="_blank"
          rel="noreferrer"
        >
          <i className="nes-icon github" />
        </a>
      </p>
    </div>
  );
}
