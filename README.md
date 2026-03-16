# Burmese Quote Generator

A simple CLI tool to generate large amounts of **Burmese quotes based on emotions** using the Gemini API.

This tool can generate datasets such as **Sadness, Joy, Love, Anger, Fear, and Surprise** quotes and export them as **TXT or CSV files**.

Perfect for:

* AI / ML dataset generation
* NLP experiments
* Burmese language sentiment datasets
* Creative writing prompts

---

# Features

* Generate hundreds or thousands of Burmese quotes
* Choose emotion category
* Export to TXT or CSV
* Runs directly from terminal
* Works with `npx` (no installation required)
* Uses Google Gemini API

---

# Requirements

* Node.js 18+
* Gemini API Key

Get an API key from the Gemini developer console.

---

# Run Without Installing (Recommended)

You can run the tool instantly using:

```
npx burmese-quote-generator sadness 100 --csv
```

This will generate **100 Burmese sadness quotes** and export them as a CSV file.

---

# Command Format

```
npx burmese-quote-generator <emotion> <limit> [--csv]
```

### Parameters

| Parameter | Description                                |
| --------- | ------------------------------------------ |
| emotion   | sadness, joy, love, anger, fear, surprise  |
| limit     | number of quotes to generate               |
| --csv     | optional flag to export CSV instead of TXT |

---

# Examples

### Generate 100 sadness quotes

```
npx burmese-quote-generator sadness 100
```

Output:

```
burmese_quotes_Sadness_100.txt
```

---

### Generate 500 love quotes in CSV

```
npx burmese-quote-generator love 500 --csv
```

Output:

```
burmese_quotes_Love_500.csv
```

---

# Interactive Mode

If you run the command without arguments, it will start an interactive prompt.

```
npx burmese-quote-generator
```

You will be asked for:

* Gemini API Key
* Emotion
* Number of quotes
* Output format

---

# Output Example

TXT format:

```
မင်းမရှိတဲ့နေ့တွေမှာ နှလုံးသားက တိတ်တိတ်လေး ကွဲနေတယ်။
အမှတ်တရတွေက နာကျင်မှုကို ပိုမိုရှင်းလင်းစေတယ်။
မပြောနိုင်တဲ့ စကားတွေက မျက်ရည်ထဲမှာ ဝှက်နေတယ်။
```

CSV format:

```
quote
"မင်းမရှိတဲ့နေ့တွေမှာ နှလုံးသားက တိတ်တိတ်လေး ကွဲနေတယ်။"
"အမှတ်တရတွေက နာကျင်မှုကို ပိုမိုရှင်းလင်းစေတယ်။"
```

---

# Development

Clone the repository:

```
git clone https://github.com/yourname/burmese-quote-generator
```

Install dependencies:

```
npm install
```

Run locally:

```
node index.js
```

---

# Publish to npm

```
npm login
npm publish
```

---

# License

MIT

---

# Author

Created for generating Burmese emotion quote datasets using the Gemini API.
