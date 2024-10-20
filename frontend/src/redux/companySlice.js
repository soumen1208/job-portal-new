import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompanies: [],
        searchCompaniesByText: "",
    },
    reducers: {
        //action
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompanies: (state, action) => {
            state.allCompanies = action.payload;
        },
        setSearchCompaniesByText: (state, action) => {
            state.searchCompaniesByText = action.payload;
        }
    }
});

export const { setSingleCompany, setAllCompanies, setSearchCompaniesByText } = companySlice.actions;
export default companySlice.reducer;
