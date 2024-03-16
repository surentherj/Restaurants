import { useState } from "react";
import { FormInput } from "../../components/forms";
import { useDispatch } from "react-redux";
import { addOrUpdateList } from "../../redux/actions/landingPage";
import Switch from "../../components/forms/switch";
import FormTextArea from "../../components/forms/textArea";

const AddOrEditScreen = ({ listDetail, setAddorEdit }) => {
  const dispatch = useDispatch();
  const [obj, setObj] = useState(listDetail);
  const onChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="wd-100">
        <FormInput
          id="name"
          type="text"
          isRequired={false}
          labelText="Restaurant Name"
          name="name"
          value={obj?.name || ""}
          warnText="Restaurant Title is required"
          onChange={onChange}
        />
        <FormTextArea
          id="description"
          type="text"
          isRequired={false}
          labelText="Restaurant Description"
          name="description"
          value={obj?.description || ""}
          warnText="Restaurant Description is required"
          onChange={onChange}
        />
        <div className="row mb-two-s">
          <div className="d-flex align-items-center ">
            <span className="font-s grey1 ml-one-s mr-three-s">
              Is Non-Veg Restaurant
            </span>
            <Switch
              name="nonVeg"
              checked={obj.nonVeg ? obj.nonVeg : false}
              onChangeEventHandler={(e) => {
                setObj({
                  ...obj,
                  nonVeg: !obj.nonVeg,
                });
              }}
            />
          </div>
        </div>
        <FormInput
          id="owner"
          type="text"
          isRequired={false}
          labelText="Restaurant Owner Name"
          name="owner"
          value={obj?.owner || ""}
          warnText="Restaurant Owner is required"
          onChange={onChange}
        />
        <FormInput
          id="phone"
          type="number"
          min={0}
          isRequired={true}
          labelText="Phone Number"
          name="phone"
          value={obj?.phone || ""}
          warnText="Phone Number is required"
          onChange={onChange}
        />
        <FormInput
          id="address"
          type="text"
          isRequired={false}
          labelText="Address"
          name="address"
          value={obj?.address || ""}
          onChange={onChange}
        />
        <FormInput
          id="costPerPerson"
          type="number"
          min="0"
          isRequired={false}
          labelText="Cost Per Person in ₹"
          name="costPerPerson"
          value={obj?.costPerPerson || ""}
          onChange={onChange}
        />
        <FormInput
          id="imageUrl"
          type="text"
          isRequired={false}
          labelText="Restaurant Ref Image"
          name="imageUrl"
          value={obj?.imageUrl || ""}
          onChange={onChange}
        />
      </div>
      <div className="row">
        <div className="d-flex align-items-center ">
          <span className="font-m grey1 ml-one-s mr-three-s">Availability</span>
          <Switch
            name="availability"
            checked={obj.availability ? obj.availability : false}
            onChangeEventHandler={(e) => {
              setObj({
                ...obj,
                availability: !obj.availability,
              });
            }}
          />
        </div>
      </div>
      <div className="sidedraw-footer">
        <div
          className={`btn btn-xsmall right btn-primary`}
          onClick={() => {
            dispatch(addOrUpdateList(obj));
            setAddorEdit(false);
          }}
        >
          Save
        </div>
        <div
          className="btn btn-xsmall btn-primary-border right mr-two-s"
          onClick={() => {
            setAddorEdit(false);
          }}
        >
          Cancel
        </div>
      </div>
    </>
  );
};
export default AddOrEditScreen;
