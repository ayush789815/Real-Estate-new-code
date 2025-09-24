import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk: Fetch paginated projects
export const fetchPaginatedProjects = createAsyncThunk(
  "ManageUser/fetchPaginatedProjects",
  async ({ page = 1, limit = 8 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://realstate-2.onrender.com/api/v1/project?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch projects");

      return {
        projects: data.projects,
        totalCount: data.totalCount,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Async thunk: Delete project
export const deleteProject = createAsyncThunk(
  "ManageUser/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://realstate-2.onrender.com/api/v1/project/${projectId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete project");

      return projectId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk: Update project status
export const updateProjectStatus = createAsyncThunk(
  "ManageUser/updateProjectStatus",
  async ({ projectId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://realstate-2.onrender.com/api/v1/project/${projectId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update project status");

      return data.updatedProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const PropertyManagementSlice = createSlice({
  name: "ManageUser",
  initialState: {
    projectList: [],
    totalCount: 0,
    propertyInformation: null,
    propertySingleInformation: null,
    showPropertyInfo: false,
    loading: false,
    error: null,
  },
  reducers: {
    addPropertyInformation: (state, action) => {
      state.propertyInformation = action.payload;
    },
    addtoggleInformation: (state) => {
      state.showPropertyInfo = !state.showPropertyInfo;
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    },
    showPropertyInformation: (state, action) => {
      state.propertySingleInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ DELETE Project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = state.projectList.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ UPDATE Project Status
      .addCase(updateProjectStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProject = action.payload;
        if (updatedProject && updatedProject._id) {
          state.projectList = state.projectList.map((project) =>
            project._id === updatedProject._id ? updatedProject : project
          );
        }
      })
      .addCase(updateProjectStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ FETCH Paginated Projects
      .addCase(fetchPaginatedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = action.payload.projects;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPaginatedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addPropertyInformation,
  addtoggleInformation,
  setProjectList,
  showPropertyInformation,
} = PropertyManagementSlice.actions;

export default PropertyManagementSlice.reducer;