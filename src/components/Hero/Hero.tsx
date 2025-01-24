import burgerHero from "../../assets/hero.png";

export const Hero = () => {
  return (
    <div
      className="relative h-48 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${burgerHero})` }}
    ></div>
  );
};
