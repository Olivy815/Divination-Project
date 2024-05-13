async function fetchFortune() {
    const userQuestion = document.getElementById('userQuestion').value.toLowerCase();
    const fortuneDisplay = document.getElementById('fortuneDisplay');

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        let apiFortune = data.slip.advice;

        
        const fortunes = {
            love: {
                good: "You will find true love very soon!",
                neutral: "Love is close, keep your heart open.",
                bad: "Love may prove challenging in the near future."
            },
            money: {
                good: "Expect a significant financial windfall soon!",
                neutral: "Financial stability is within your reach.",
                bad: "Be cautious with your expenditures right now."
            },
            health: {
                good: "Great vitality and energy are coming your way!",
                neutral: "Maintain your health with consistent care.",
                bad: "Take precautions to avoid illness in the coming days."
            },
            job: {
                good: "A promotion or new job offer is on the horizon!",
                neutral: "Steady progress is being made in your career.",
                bad: "Prepare for some setbacks at work."
            },
            travel: {
                good: "An amazing travel opportunity will arise soon!",
                neutral: "A journey may be on the horizon, plan carefully.",
                bad: "Travel plans may face some complications."
            }
        };

        let customFortuneFound = false;

       
        Object.keys(fortunes).forEach(key => {
            if (new RegExp(key).test(userQuestion)) {
                const outcomes = ['good', 'neutral', 'bad'];
                const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
                apiFortune = fortunes[key][randomOutcome];
                customFortuneFound = true;
            }
        });

     
        fortuneDisplay.textContent = customFortuneFound ? apiFortune : "" + apiFortune;
    } catch (error) {
        console.error('Failed to fetch fortune:', error);
        fortuneDisplay.textContent = "Failed to load fortune, please try again.";
    }
}
