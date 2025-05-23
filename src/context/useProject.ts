import { useContext } from "react";

//context
import { ProjectContext } from './ProjectContext'

export const useProject = () => {
    const context = useContext(ProjectContext);

    if (!context) {
        throw new Error("Erro no provider");
    }

    return context;
};
