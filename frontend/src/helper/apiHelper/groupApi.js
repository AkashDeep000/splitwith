import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function listGroups({ token }) {
  if (!token) {
    return Promise.reject(new Error("There is no token provided!"));
  }
  const response = await api.get("/group", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
}

export async function listGroupsMinimal({ token }) {
  if (!token) {
    return Promise.reject(new Error("There is no token provided!"));
  }
  const response = await api.get("/group/minimal", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
}

export async function createGroup({ token, data }) {
  if (!token) {
    return Promise.reject(new Error("There is no token provided!"));
  }
  const response = await api({
    method: "post",
    url: "/group",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  console.log(response);
  return response.data;
}

export async function getGroup({ token, groupId }) {
  if (!token || !groupId) {
    return Promise.reject(new Error("There is no token or groupId provided!"));
  }
  const response = await api({
    method: "get",
    url: `/group/${groupId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
}

export async function getInviteGroup({ groupId }) {
  if (!groupId) {
    return Promise.reject(new Error("There is no groupId provided!"));
  }
  const response = await api({
    method: "get",
    url: `/invite/${groupId}`,
  });
  console.log(response);
  return response.data;
}
export async function joinGroup({ token, groupId }) {
  if (!token || !groupId) {
    return Promise.reject(new Error("There is no token or groupId provided!"));
  }

  const response = await api({
    method: "post",
    url: `group/${groupId}/join`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
}

export async function addBill({ token, groupId, billInfo }) {
  console.log(token, groupId, billInfo);

  if (!token || !groupId || !billInfo) {
    return Promise.reject(
      new Error("There is no token or groupId or billInfo provided!")
    );
  }

  const response = await api({
    method: "post",
    url: `group/${groupId}/bill`,
    headers: { Authorization: `Bearer ${token}` },
    data: billInfo,
  });
  console.log(response);
  return response.data;
}

export async function settleUp({ token, groupId, senderId, receiverId, amount }) {
  console.log(token, groupId, senderId, receiverId, amount);

  if (!token || !groupId || !senderId || !amount) {
    return Promise.reject(new Error("There is some field misding provided!"));
  }

  const data = {
    senderId,
    amount,
  };

  if (receiverId) {
    data.receiverId = receiverId;
  }
  const response = await api({
    method: "post",
    url: `group/${groupId}/settle`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  console.log(response);
  return response.data;
}

export async function addMember({ token, groupId, name }) {
  if (!token || !groupId || !name) {
    return Promise.reject(new Error("There is some field misding provided!"));
  }

  const response = await api({
    method: "post",
    url: `group/${groupId}/member`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      name,
    },
  });
  console.log(response);
  return response.data;
}

export async function deleteMember({ token, groupId, senderId, amount }) {
  console.log(token, groupId, memberId);

  if (!token || !groupId || !memberId) {
    return Promise.reject(new Error("There is some field misding provided!"));
  }

  const response = await api({
    method: "delete",
    url: `group/${groupId}/delete-member`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      groupId,
      memberId,
    },
  });
  console.log(response);
  return response.data;
}
