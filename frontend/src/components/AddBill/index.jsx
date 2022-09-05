import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import GroupSelector from "./GroupSelector";
import PayeSelector from "./PayeSelector";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { listGroupsMinimal, addBill } from "@/helper/apiHelper/groupApi";
import useAddBillStore from "@/store/addBillStore";
import useUserStore from "@/store/userStore";
import Spinner from "@/components/utils/Spinner";
import addBillValidator from "@/helper/validator/addBillValidator";

export default function AddBill() {
  const navigate = useNavigate();
  const addBillStore = useAddBillStore((state) => state.addBill);
  const setAddBillStore = useAddBillStore((state) => state.setAddBill);
  const user = useUserStore((state) => state.user);

  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const [isPayeOpen, setIsPayeOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const [currentMember, setCurrentMember] = useState({});
  const [members, setMembers] = useState([]);

  const [cookies] = useCookies(["accessToken"]);

  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError, error } = useQuery([`groups-minimal`], () =>
    listGroupsMinimal({ token: cookies.accessToken })
  );

  if (isError) {
    console.log(eror);
  }

if(data?.length <= 0) {
  return (
          <div className={`inset-0 grid px-4 place-items-center backdrop-blur bg-slate-400/10 ${
            addBillStore.open ? "fixed" : "hidden"
          }`}>
        <div className="w-full p-4 max-w-[25rem] bg-white grid gap-4 place-items-center">
        <p className="text-slate-800"> Does not have any group. First create one.
        </p>
        <Link to="/dashboard/groups" 
        onClick={() => setAddBillStore({open : false})}
        className="px-3 py-1.5 rounded text-white bg-indigo-500">
        Go to groups
        </Link>
</div>
</div>

    )
}

  const {
    isLoading: isAdding,
    isError: isAddError,
    isSuccess: isAddSuccess,
    mutate: mutateAddBill,
  } = useMutation(
    () => {
      return addBill({
        token: cookies.accessToken,
        groupId: currentGroup.id,
        billInfo: getBillInfo(),
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("groups");
        queryClient.invalidateQueries("transitions");
        setAddBillStore({ open: false });
        navigate(`/dashboard/groups/${currentGroup.id}`);
      },
      onError: (err) => {
        if (err.response?.data?.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg("Something wrong happened.");
        }
      },
    }
  );

  const floatify = (number) => {
    return parseFloat(number.toFixed(10));
  };

  useEffect(() => {
    if (!data) return;

    if (addBillStore.groupId) {
      setCurrentGroup(data.find((x) => x.id === addBillStore.groupId));
    } else {
      setCurrentGroup(data[0]);
    }
  }, [data, addBillStore]);

  useEffect(() => {
    setMembers(currentGroup.members);
    setCurrentMember(user);
  }, [currentGroup]);

  const profileImage = (data) => {
    if (data.profileImage) {
      return data.profileImage;
    }
    switch (data.category) {
      case "trip":
        return "/images/trip.png";

      case "home":
        return "/images/home.png";

      case "office":
        return "/images/chair.png";

      case "sport":
        return "/images/sport.png";

      default:
        return "/images/group.png";
    }
  };

  const formik = useFormik({
    validate: addBillValidator,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      title: "",
      amount: "",
    },
    onSubmit: mutateAddBill,
  });

  const getBillInfo = () => {
    if (!members) return null;

    const bill = {
      title: formik.values.title,
      paidById: currentMember.id,
      amount: formik.values.amount,
      paidFor: [],
    };
    const total = formik.values.amount * 100;
    const perHead = Math.floor(total / members.length);
    const extra = total % members.length;

    for (let i = 0; i < members.length; i++) {
      if (i >= members.length - extra) {
        const data = {
          id: members[i].id,
          amount: (perHead + 1) / 100,
        };
        bill.paidFor.push(data);
      } else {
        const data = {
          id: members[i].id,
          amount: perHead / 100,
        };
        bill.paidFor.push(data);
      }
    }

    return bill;
  };

  const handleAmountChange = (event) => {
    const input = event.target.value;

    const normValue = Number(
      (Math.floor(input * 100) / 100)
        .toString()
        .match(/^-?\d+(?:\.\d{0,2})?/)[0]
    );

    formik.setFieldValue("amount", normValue === 0 ? null : normValue);
  };
  
    return (
      <>
        <div
          className={`inset-0 grid px-4 place-items-center backdrop-blur bg-slate-400/10 ${
            addBillStore.open ? "fixed" : "hidden"
          }`}
        >
          <div className="bg-white w-full max-w-[25rem] p-4 text-left">
            <p className="text-center text-lg mb-4 text-indigo-500 font-semibold font-ubuntu">
              Add new expense bill
            </p>
            {isAddError ? (
              <div className="px-2 py-1.5 bg-red-50 text-red-400 border border-red-300 mb-3 text-sm">
                {errorMsg}
              </div>
            ) : null}
            <div className="grid place-items-center grid-cols-[auto_1fr_auto] gap-2">
              <p className="">Chose Group :</p>
              <div
                className={`transition-all w-full relative bg-orange-100 p-1 grid grid-cols-[auto_1fr] items-center gap-1 ${
                  isGroupOpen
                    ? "rounded-t-lg border border-b-0"
                    : "rounded-full"
                }`}
              >
                <div
                  onClick={() => setIsGroupOpen(!isGroupOpen)}
                  className="p-1.5 bg-orange-200 rounded-full"
                >
                  <img className=" h-5 w-5" src={profileImage(currentGroup)} />
                </div>
                <p
                  onClick={() => setIsGroupOpen(!isGroupOpen)}
                  className="text-slate-800 line-clamp-1 h-6 text-left"
                >
                  {currentGroup.name}
                </p>
                <GroupSelector
                  data={data}
                  useIsGroupsOpen={[isGroupOpen, setIsGroupOpen]}
                  useCurrentGroup={[currentGroup, setCurrentGroup]}
                />
              </div>

              <button
                onClick={() => {
                  setIsPayeOpen(false);
                  setIsGroupOpen(true);
                }}
                className="text-indigo-500 text-sm font-semibold"
              >
                change
              </button>
            </div>

            <div className="p-2"></div>

            <div className="grid place-items-center grid-cols-[auto_1fr_auto] gap-2">
              <p className="">Paid by :</p>

              <div
                className={`transition-all w-full relative bg-orange-100 p-1 grid grid-cols-[auto_1fr] items-center gap-1 ${
                  isPayeOpen ? "rounded-t-lg border border-b-0" : "rounded-full"
                }`}
              >
                <div
                  onClick={() => setIsPayeOpen(!isPayeOpen)}
                  className="p-1.5 bg-orange-200 rounded-full"
                >
                  <img
                    className=" h-5 w-5"
                    src={
                      currentMember.profileImage ||
                      `https://avatars.dicebear.com/api/male/${currentMember.id}.svg`
                    }
                  />
                </div>
                <p
                  onClick={() => setIsPayeOpen(!isPayeOpen)}
                  className="text-slate-800 line-clamp-1 h-6 text-left"
                >
                  {currentMember.id === user?.id
                    ? `You (${currentMember.name})`
                    : currentMember.name}
                </p>

                <PayeSelector
                  user={user}
                  data={members}
                  useCurrentMember={[currentMember, setCurrentMember]}
                  useIsPayeOpen={[isPayeOpen, setIsPayeOpen]}
                />
              </div>

              <button
                onClick={() => {
                  setIsGroupOpen(false);
                  setIsPayeOpen(true);
                }}
                className="text-indigo-500 text-sm font-semibold"
              >
                change
              </button>
            </div>

            <div className="mt-3">
              <label className="text-slate-800" htmlFor="title">
                Title for this bill :
              </label>
              <input
                className={`bg-white border border-2 border-slate-300 focus:outline-indigo-400 rounded w-full h-11 px-2 text-indigo-500 ${
                  formik.errors.title ? "formInputError" : ""
                }`}
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Enter bill title"
              />
              {formik.errors.title ? (
                <div className="formInputErrorText">{formik.errors.title}</div>
              ) : null}
            </div>

            <div className="mt-3">
              <label className="text-slate-800" htmlFor="amount">
                Total Amount :
              </label>
              <input
                className={`bg-white border border-2 border-slate-300 focus:outline-indigo-400 rounded w-full h-11 px-2 text-indigo-500 ${
                  formik.errors.amount ? "formInputError" : ""
                }`}
                onChange={handleAmountChange}
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                placeholder="Enter total amount"
              />
              {formik.errors.amount ? (
                <div className="formInputErrorText">{formik.errors.amount}</div>
              ) : null}
            </div>
            <div className="my-3 text-slate-800 flex justify-between">
              {members && formik.values.amount ? (
                <>
                  <p>
                    Splitting between:{" "}
                    <span className="text-indigo-500">{members.length}</span>
                  </p>
                  <p>
                    Per head:{" "}
                    <span className="text-indigo-500">
                      {floatify(formik.values.amount / members.length)}
                    </span>
                  </p>
                </>
              ) : null}
            </div>
            <div className="grid grid-flow-col grid-cols-2 gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAddBillStore({ open: false });
                }}
                disabled={isLoading}
                className="text-white w-full bg-red-500 py-1.5 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={formik.handleSubmit}
                disabled={isLoading || isAdding}
                className="text-white w-full bg-indigo-500 py-1.5 rounded"
              >
                {isAdding ? (
                  <p>
                    Adding bill...
                    <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
                  </p>
                ) : (
                  "Add bill"
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

