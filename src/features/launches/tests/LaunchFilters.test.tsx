import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import LaunchFilters from "../components/LaunchFilters"
import { renderWithProviders } from "../../../test/render"

describe("LaunchFilters", () => {
  it("renders initial values from props", () => {
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search="falcon"
        success="true"
        upcoming="false"
        from="2024-01-01"
        to="2024-12-31"
        setParams={setParams}
      />
    )

    expect(screen.getByLabelText("Search launches")).toHaveValue("falcon")
    expect(screen.getByLabelText("Filter by success")).toHaveValue("true")
    expect(screen.getByLabelText("Filter by upcoming launches")).toHaveValue(
      "false"
    )
    expect(screen.getByLabelText("Filter from date")).toHaveValue("2024-01-01")
    expect(screen.getByLabelText("Filter to date")).toHaveValue("2024-12-31")
  })

  it("calls setParams when typing in search", async () => {
    const user = userEvent.setup()
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    await user.type(screen.getByLabelText("Search launches"), "falcon")

    expect(setParams).toHaveBeenCalled()
  })

  it("calls setParams when changing success filter", async () => {
    const user = userEvent.setup()
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    await user.selectOptions(screen.getByLabelText("Filter by success"), "true")

    expect(setParams).toHaveBeenCalled()
  })

  it("calls setParams when changing upcoming filter", async () => {
    const user = userEvent.setup()
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    await user.selectOptions(
      screen.getByLabelText("Filter by upcoming launches"),
      "false"
    )

    expect(setParams).toHaveBeenCalled()
  })

  it("calls setParams when changing date interval", async () => {
    const user = userEvent.setup()
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    await user.clear(screen.getByLabelText("Filter from date"))
    await user.type(screen.getByLabelText("Filter from date"), "2024-01-01")

    await user.clear(screen.getByLabelText("Filter to date"))
    await user.type(screen.getByLabelText("Filter to date"), "2024-12-31")

    expect(setParams).toHaveBeenCalled()
  })

  it("renders all visible labels and controls", () => {
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("From")).toBeInTheDocument()
    expect(screen.getByText("To")).toBeInTheDocument()

    expect(screen.getByLabelText("Search launches")).toBeInTheDocument()
    expect(screen.getByLabelText("Filter by success")).toBeInTheDocument()
    expect(
      screen.getByLabelText("Filter by upcoming launches")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Filter from date")).toBeInTheDocument()
    expect(screen.getByLabelText("Filter to date")).toBeInTheDocument()
  })
})
