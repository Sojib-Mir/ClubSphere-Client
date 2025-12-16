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

      {/* Recent Clubs */}
      <section>
        <RecentClubs />
      </section>

      {/* How ClubSphere Works */}
      <section>
        <ClubSphereWorks />
      </section>

      {/* WhyJoinClub */}
      <section>
        <WhyJoinAClub />
      </section>
    </div>
  );
};

export default Home;
