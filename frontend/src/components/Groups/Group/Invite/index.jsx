import { useCookies } from "react-cookie";
import { addMember } from "@/helper/apiHelper/groupApi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Spinner from "@/components/utils/Spinner";
import { HiClipboardCopy, HiClipboardCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Invite({ groupId, useInviteOpen, isAdmin }) {
  const [isInviteOpen, setIsInviteOpen] = useInviteOpen;
  const [cookies] = useCookies(["accessToken"]);
  const [isCopied, setIsCopied] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    isSuccess,
    mutate: handleSubmit,
  } = useMutation(
    () => {
      return addMember({
        token: cookies.accessToken,
        name: formik.values.name,
        groupId,
      });
    },
    {
      onSuccess: async (newGroup) => {
        queryClient.invalidateQueries("groups");
        queryClient.invalidateQueries("groups-minimal");
        setIsInviteOpen(false);
      },
    }
  );

  const addMemberValidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 50) {
      errors.name = "Must be less than 50 character";
    }

    return errors;
  };

  //
  const formik = useFormik({
    validate: addMemberValidate,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      name: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div
      className={`grid px-8 place-items-center backdrop-blur-sm bg-slate-400/20 w-full z-10 overflow-scroll ${
        isInviteOpen ? "fixed inset-0" : "hidden"
      }`}
    >
      <div className="w-full p-4 max-w-[25rem] overflow-x-auto bg-white">
        <div className="grid grid-cols-[1fr_auto]">
          <p className="text-left mb-3 text-indigo-500 font-semibold font-ubuntu py-1">
            Add new group member
          </p>

          <IoClose
            onClick={() => setIsInviteOpen(false)}
            className="text-indigo-500 w-7 h-7"
          />
        </div>
        <div className="text-center">
          <p className="p-3 ">Share this link to invite new member</p>
          <div className="p-2 m-3 bg-gray-100 overflow-x-auto">
            {import.meta.env.VITE_APP_URL}/invite/{groupId}
          </div>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded mt-2 mb-4">
            <CopyToClipboard
              className="text-center"
              text={`${import.meta.env.VITE_APP_URL}/invite/${groupId}`}
              onCopy={() => setIsCopied(true)}
            >
              <span>
                {isCopied ? (
                  <div className="flex">
                    <HiClipboardCheck className="w-5 h-5" />
                    <p>Copied</p>
                  </div>
                ) : (
                  <div className="flex">
                    <HiClipboardCopy className="w-5 h-5" />
                    Copy
                  </div>
                )}
              </span>
            </CopyToClipboard>
          </button>
          {isAdmin ? (
            <>
              <p className="text-2xl text-indigo-500">OR</p>
              <p className="text-slate-800">
                Add member manually, these merbers will be controlled by group
                admin
              </p>
              <form onSubmit={formik.handleSubmit}>
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
                  <div className="formInputErrorText text-left">
                    {formik.errors.name}
                  </div>
                ) : null}
                <button
                  className="mt-3 rounded bg-indigo-500 text-white px-3 py-1.5"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <p>
                      Adding member...
                      <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
                    </p>
                  ) : (
                    "Add Member"
                  )}
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
