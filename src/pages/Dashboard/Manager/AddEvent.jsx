import AddEventForm from "../../../components/Form/AddEventForm";
import UseTitle from "../../../hooks/useTitle";

const AddEvent = () => {
  UseTitle("Add-Event");
  return (
    <div>
      {/* Form */}
      <AddEventForm />
    </div>
  );
};

export default AddEvent;
