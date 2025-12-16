import AddClubForm from "../../../components/Form/AddClubForm";
import UseTitle from "../../../hooks/useTitle";

const AddClub = () => {
  UseTitle("Add-Club");
  return (
    <div>
      {/* Form */}
      <AddClubForm />
    </div>
  );
};

export default AddClub;
