from transformers import AutoModelForSeq2SeqLM, T5TokenizerFast
import pandas as pd
import torch

def test():
    # Загрузка датасета
    dataset = pd.read_csv("RuSpellGoldDataset.csv")
    MODEL_NAME = 'UrukHan/t5-russian-spell'
    loaded_model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

    # Загрузка сохраненных весов модели с явным указанием map_location
    model_path = "spelling_and_punctuation_correction_model.pth"
    loaded_model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    loaded_model.eval()

    # Загрузка токенизатора
    tokenizer = T5TokenizerFast.from_pretrained(MODEL_NAME)

    # Удаление пустых значений из датасета
    dataset = dataset.dropna()
    input_sequences = dataset["Неправильный вариант"]

    task_prefix = "Spell correct: "

    # Токенизация и выполнение предсказаний
    MAX_INPUT = 256
    encoded = tokenizer(
        [task_prefix + sequence for sequence in input_sequences],
        padding="max_length",
        max_length=MAX_INPUT,
        truncation=True,
        return_tensors="pt",
    )

    with torch.no_grad():
        predicts = loaded_model.generate(encoded['input_ids'])  # Генерация предсказаний

    decode_prediction = tokenizer.batch_decode(predicts, skip_special_tokens=True)  # Декодирование предсказаний

    print(decode_prediction)

# Вызываем функцию test для выполнения прогнозов
test()
