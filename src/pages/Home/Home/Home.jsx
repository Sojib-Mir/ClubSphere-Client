import Plants from "../../../components/Home/Plants";
import Hero from "../Hero/Hero";
import RecentClubs from "../RecentClubs/RecentClubs";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Recent Clubs */}
      <section><RecentClubs/></section>

      {/* <Plants /> */}

      {/* More components */}
    </div>
  );
};

export default Home;
