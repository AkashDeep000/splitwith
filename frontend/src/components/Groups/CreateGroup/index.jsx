import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CategorySelectBtn from "./CategorySelectBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { createGroup } from "@/helper/apiHelper/groupApi";
import createGroupValidator from "@/helper/validator/createGroupValidator";
import Spinner from "@/components/utils/Spinner";

export default function CreateGroup({ useCreateOpen }) {
  const [isCreateOpen, setIsCreateOpen] = useCreateOpen;
  const [cookies] = useCookies(["accessToken"]);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    isSuccess,
    mutate: handleSubmit,
  } = useMutation(
    (newGroup) => {
      return createGroup({
        token: cookies.accessToken,
        data: newGroup,
      });
    },
    {
      onSuccess: async (newGroup) => {
        queryClient.invalidateQueries("groups");
        queryClient.invalidateQueries("groups-minimal");
        setIsCreateOpen(false);
      },
    }
  );

  //
  const formik = useFormik({
    validate: createGroupValidator,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      category: "",
      name: "",
    },
    onSubmit: handleSubmit,
  });
  const newGroup = formik.values;

  return (
    <div
      className={`grid px-8 place-items-center backdrop-blur bg-slate-400/20 w-full z-10 overflow-y-auto ${
        isCreateOpen ? "fixed inset-0" : "hidden"
      }`}
    >
      <div className="w-full p-4 max-w-[25rem] overflow-x-auto bg-white">
        <p className="text-left mb-3 text-indigo-500 font-semibold font-ubuntu">
          Create a new group
        </p>
        <form className="">
          <label className="formInputLebel" htmlFor="name">
            Group name
          </label>
          <input
            className={`formInput mt-2 ${
              formik.errors.name ? "formInputError" : ""
            }`}
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Enter Group Name"
          />
          {formik.errors.name ? (
            <div className="formInputErrorText">{formik.errors.name}</div>
          ) : null}

          <div className="formInputLebel mt-3">Group category</div>
          <div className="w-full px-1 py-2 flex gap-2 overflow-x-auto">
            <CategorySelectBtn
              checked={formik.values.category === "trip"}
              onChange={() => formik.setFieldValue("category", "trip")}
              name="category"
              id="trip"
              img="/images/trip.png"
            />

            <CategorySelectBtn
              checked={formik.values.category === "home"}
              onChange={() => formik.setFieldValue("category", "home")}
              name="category"
              id="home"
              img="/images/home.png"
            />

            <CategorySelectBtn
              checked={formik.values.category === "office"}
              onChange={() => formik.setFieldValue("category", "office")}
              name="category"
              id="office"
              img="/images/chair.png"
            />

            <CategorySelectBtn
              checked={formik.values.category === "sport"}
              onChange={() => formik.setFieldValue("category", "sport")}
              name="category"
              id="sport"
              img="/images/sport.png"
            />

            <CategorySelectBtn
              checked={formik.values.category === "others"}
              onChange={() => formik.setFieldValue("category", "others")}
              name="category"
              id="others"
              img="/images/group.png"
            />
          </div>
          {formik.errors.category ? (
            <div className="formInputErrorText">{formik.errors.category}</div>
          ) : null}
          <div className="grid grid-flow-col grid-cols-2 gap-2 mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsCreateOpen(false);
              }}
              disabled={isLoading}
              className="text-white w-full bg-red-500 py-1.5 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              onClick={formik.handleSubmit}
              className="text-white w-full bg-indigo-500 py-1.5 rounded"
            >
              {isLoading ? (
                <p>
                  Creating...
                  <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
                </p>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
