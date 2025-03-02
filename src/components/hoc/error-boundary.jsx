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
                    <div className="z-[100] fixed top-0 left-0 w-full h-full flex justify-center items-center content-center bg-absolute-black/10 backdrop-blur-md">
                        <Card shadowSize="md">
                            <div className="w-full h-full text-center content-center">
                                <h1 className="text-white font-manrope font-bold text-2xl">Something went wrong</h1>
                                <p className="text-white font-manrope">{this.state.error.message}</p>
                            </div>
                        </Card>
                    </div>
                )
            }
            return (
                <div className="w-full h-full text-center content-center">
                    <h1 className="text-white font-manrope font-bold text-2xl">Something went wrong</h1>
                    <p className="text-white font-manrope">{this.state.error.message}</p>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;