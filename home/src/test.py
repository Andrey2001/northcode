from transformers import AutoModelForSeq2SeqLM, T5TokenizerFast
import pandas as pd
import torch

def test(dataset):
    MODEL_NAME = 'UrukHan/t5-russian-spell'
    loaded_model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

    # Load the saved weights
    # model_path = "spelling_and_punctuation_correction_model.pth"
    # loaded_model.load_state_dict(torch.load(model_path))
    loaded_model.eval()

    # Load the tokenizer
    tokenizer = T5TokenizerFast.from_pretrained(MODEL_NAME)

    # Your dataset and input sequences
    dataset = dataset.dropna()
    input_sequences = dataset["Неправильный вариант"]

    task_prefix = "Spell correct: "

    # Tokenize and predict
    MAX_INPUT = 256
    encoded = tokenizer(
        [task_prefix + sequence for sequence in input_sequences],
        padding="max_length",
        max_length=MAX_INPUT,
        truncation=True,
        return_tensors="pt",
    )

    with torch.no_grad():
        predicts = loaded_model.generate(encoded['input_ids'])  # Generate predictions

    decode_prediction = tokenizer.batch_decode(predicts, skip_special_tokens=True)  # Decode predictions

    return decode_prediction