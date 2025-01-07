import { useEffect, useState } from "react";

// The line contain's "useStat() hook" only runs on Mounting Phase

function AppV2() {
    const [count, setCount] = useState(function () {
        console.log("( Mounting Phase )");
        return Number(localStorage.getItem("count")) || 0;
    });

    const [step, setStep] = useState(function () {
        console.log("( Mounting Phase )");
        return Number(localStorage.getItem("step")) || 0;
    });

    useEffect(
        function () {
            console.log("( Render Phase ) - Count Update");
            // Save Updated Count To Local Storage
            localStorage.setItem("count", count);
        },
        [count]
    );

    useEffect(
        function () {
            console.log("( Render Phase ) - Step Update");
            // Save Updated Step To Local Storage
            localStorage.setItem("step", step);
        },
        [step]
    );

    function handleAddCount() {
        setCount(count + 1);
    }

    function handleAddStep() {
        setStep(step + 1);
    }

    return (
        <div>
            <div>
                <h1>{count}</h1>
                <button onClick={handleAddCount}>Add Count</button>
            </div>
            <div>
                <h1>{step}</h1>
                <button onClick={handleAddStep}>Add Step</button>
            </div>
        </div>
    );
}

export default AppV2;
