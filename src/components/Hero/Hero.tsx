import { useRestaurant } from "../../contexts/RestaurantContext";

export const Hero = () => {
  const { restaurantData } = useRestaurant();
  const bannerImage = restaurantData.webSettings.bannerImage;

  return (
    <div
      className="relative h-48 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImage})` }}
    ></div>
  );
};
