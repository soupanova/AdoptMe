// You can find this in the React doc for more information
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return {hasError: true }
    }
    componentDidCatch(error, info){ 
        
    }
}
