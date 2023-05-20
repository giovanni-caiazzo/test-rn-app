import { render, cleanup } from "@testing-library/react-native";
import { DataContext } from "../utils/AppContext";
import CustomText from "../components/CustomText";

import BackendApprovedComponent from "../components/BackendApprovedComponent";

describe("Backend Approved component", () => {
  afterEach(() => cleanup());

  it("Calls loading when waiting for approval data", async () => {
    const { toJSON } = render(
      <DataContext.Provider value={null}>
        <BackendApprovedComponent field="attendance">
          <CustomText>test</CustomText>
        </BackendApprovedComponent>
      </DataContext.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders empty view when there is no permission (is null)", async () => {
    const { toJSON } = render(
      <DataContext.Provider
        value={{
          data: { app_configuration: {}, user: { email: "" } },
          isCurrentlyConnected: true,
          error: false,
          cognitoToken: "Valid",
        }}
      >
        <BackendApprovedComponent field="attendance">
          <CustomText>test</CustomText>
        </BackendApprovedComponent>
      </DataContext.Provider>
    );
    expect(toJSON()).toBeFalsy();
  });

  it("renders children when there is permission", async () => {
    const { toJSON } = render(
      <DataContext.Provider
        value={{
          data: {
            app_configuration: { attendance: true },
            user: { email: "" },
          },
          isCurrentlyConnected: true,
          error: false,
          cognitoToken: "Valid",
        }}
      >
        <BackendApprovedComponent field="attendance">
          <CustomText>test</CustomText>
        </BackendApprovedComponent>
      </DataContext.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
