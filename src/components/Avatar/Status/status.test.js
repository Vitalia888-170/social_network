import React from "react";
//@ts-ignore
import { create } from "react-test-renderer";
import ProfileStatus from './status.jsx';

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="Really good idea!" />);
    const instance = component.getInstance();
    expect(instance.status).toBe("Really good idea!");
  });
});