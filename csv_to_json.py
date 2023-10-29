import csv, json

csv_file_path = "vocabulary.csv"
json_file_path = "vocabulary.json"

data = {"vocabulary" : []}
index = 0
with open(csv_file_path) as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for rows in csv_reader:
        row = {}
        for key in rows.keys():
            row[key] = rows[key]
        data["vocabulary"].append(row)

print(data)
print(json.dumps(data, indent=4, ensure_ascii=False))

with open(json_file_path, "w", encoding="utf-8") as json_file:
    json_file.write(json.dumps(data, indent=4, ensure_ascii=False))