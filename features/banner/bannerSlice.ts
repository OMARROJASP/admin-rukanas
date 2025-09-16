import { Banner } from "@/services/bannerApi";
import { Category } from "@/services/categoryApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BannerState = {
    selected: Banner | null;
}

const initialState: BannerState = {
    selected: null,
}

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
    setSelectdBanner(state, action: PayloadAction<Banner>) {
        state.selected = action.payload
    },
    clearSelectedBanner: (state) => {
        state.selected = null
    }
}
})

export const {setSelectdBanner, clearSelectedBanner} = bannerSlice.actions;
export default bannerSlice.reducer;