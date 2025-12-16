import Plants from "../../../components/Home/Plants";
import ClubSphereWorks from "../ClubSphereWorks/ClubSphereWorks";
import Hero from "../Hero/Hero";
import RecentClubs from "../RecentClubs/RecentClubs";
import WhyJoinAClub from "../WhyJoinClub/WhyJoinClub";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Recent Clubs Section */}
      <section>
        <RecentClubs />
      </section>

      {/* How ClubSphere Works Section */}
      <section>
        <ClubSphereWorks />
      </section>

      {/* Why Join Club Section */}
      <section>
        <WhyJoinAClub />
      </section>
    </div>
  );
};

export default Home;
