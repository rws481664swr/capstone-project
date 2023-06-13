import GlobalContext from "../state/contexts/GlobalContext";
import {MOCK_TOKEN} from "./mock-backend";
import {MemoryRouter} from "react-router-dom";

const MockContext = ({children, isAdmin = false, ...mockValue}) => {
    return (
        <MemoryRouter>
            <GlobalContext.Provider value={{
                token: MOCK_TOKEN,
                _id: 'id',
                username: 'username',
                role: isAdmin ? "ADMIN" : "STUDENT",
                loggedIn: true,
                timestamp: new Date(),
                ...mockValue
            }}>
                {children}
            </GlobalContext.Provider>
        </MemoryRouter>
    )
}

export default MockContext