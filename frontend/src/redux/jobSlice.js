import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJobs: null,
        loading: false,
        searchJobsByText: "",
        allAppliedJobs: [],
        searchedQuery: ""
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJobs: (state, action) => {
            state.singleJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobsByText: (state, action) => {
            state.searchJobsByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }

    }
});
export const { setAllJobs, setSingleJobs, setAllAdminJobs, setSearchJobsByText, setAllAppliedJobs, setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;