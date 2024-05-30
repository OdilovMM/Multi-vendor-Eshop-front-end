import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addFriendChat = createAsyncThunk(
  "chat/addFriend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/add-customer-chat`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
    console.log(messageInfo);
    try {
      const { data } = await api.post(
        `/chat/send-message-to-seller`,
        messageInfo,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    successMessage: "",
    myFriends: [],
    friendMessages: [],
    currentFriend: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.friendMessages = [...state.friendMessages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriendChat.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(addFriendChat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.friendMessages = payload.messages;
        state.currentFriend = payload.currentFriend;
        state.myFriends = payload.MyFriends;
        // toast.success(payload.message);
      })
      .addCase(addFriendChat.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.error);
      })
      .addCase(sendMessage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        let tempFriends = state.myFriends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.messageText.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.myFriends = tempFriends;
        state.friendMessages = [...state.friendMessages, payload.messageText];
        state.successMessage = "success";
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.error);
      });
  },
});
export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
