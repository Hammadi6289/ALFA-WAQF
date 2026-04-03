import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBlocks,
  addBlock,
  updateBlock,
  deleteBlock,
  reorderBlocks,
} from "../actions/contentBlockActions";

const contentBlockSlice = createSlice({
  name: "contentBlock",
  initialState: {
    loading: false,
    success: false,
    blocks: [],
    block: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
    setBlock: (state, action) => {
      state.block = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL BLOCKS
      .addCase(getAllBlocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks = action.payload.blocks || [];
      })
      .addCase(getAllBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD BLOCK
      .addCase(addBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE BLOCK
      .addCase(updateBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE BLOCK
      .addCase(deleteBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REORDER BLOCKS
      .addCase(reorderBlocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(reorderBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(reorderBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, setBlock } = contentBlockSlice.actions;
export default contentBlockSlice.reducer;
