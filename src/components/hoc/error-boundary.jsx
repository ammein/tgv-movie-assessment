import {Component} from "react";
import Card from "../generic/card.jsx";

class ErrorBoundary extends Component{
    state = { hasError: null, error: "" }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render(){
        if(this.state.hasError){
            if(this.props.modal) {
                return (
                    <Card shadowSize="md">

                    </Card>
                )
            }
            return (
                <div className="flex flex-col gap-2 w-full text-center">
                    <h1 className="text-white font-manrope text-2xl leading-0.5">Something went wrong</h1>
                    <p className="text-white font-manrope leading-1">{this.state.error.message}</p>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;