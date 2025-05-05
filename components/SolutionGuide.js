function SolutionGuide({ onClose }) {
    try {
        const solutionSteps = [
            {
                step: 1,
                description: "Start by moving pegs towards the empty center hole",
                from: [4, 1],
                to: [4, 3]
            },
            {
                step: 2,
                description: "Continue clearing pegs from the left side by making valid jumps",
                from: [4, 0],
                to: [4, 2]
            },
            {
                step: 3,
                description: "Work systematically from left to right, using the center area for temporary moves",
                from: [3, 1],
                to: [5, 1]
            }
        ];

        return (
            <div data-name="solution-guide" className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                    <h2 className="text-2xl font-bold mb-4">Solution Guide</h2>
                    <div className="space-y-4">
                        {solutionSteps.map((step) => (
                            <div 
                                key={step.step}
                                className="p-4 bg-gray-100 rounded-lg"
                            >
                                <h3 className="font-bold text-lg mb-2">
                                    Step {step.step}
                                </h3>
                                <p className="mb-2">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SolutionGuide component error:', error);
        reportError(error);
        return null;
    }
}
