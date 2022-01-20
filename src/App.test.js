import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import SignInOrUp from "./pages/SignInOrUp";

//Testes não estão funcionando :(

jest.mock("./hooks/useGlobal", () => ({
  useGlobal: () => ({ state: "mocked_value" }),
}));

describe("Sign in tests", () => {
  const onSubmit = jest.fn();
  beforeEach(() => {
    onSubmit.mockClear();
  });
  render(
    <BrowserRouter>
      <SignInOrUp onSubmit={onSubmit} />
    </BrowserRouter>
  );

  test("form submited all when all fields are validated", async () => {
    const username = screen.getByRole("textbox", {
      name: /usuário/i,
    });
    user.type(username, "teste2");

    const password = screen.getByLabelText(/senha \*/i);
    user.type(password, "12345");

    const loginBtn = screen.getByTestId("btn-login-cadastrar");

    fireEvent.click(loginBtn);

    expect(onSubmit).toHaveBeenCalled();
  });
});
