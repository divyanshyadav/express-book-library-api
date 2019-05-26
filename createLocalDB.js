const fs = require('fs');

const createLocalDB = (file) => {
    if (!file) {
        throw new Error('Please provide a file JSON file.');
    }

    let records = {};

    const getRecords = () => {
        const text = fs.readFileSync(file, 'utf8');
        records = JSON.parse(text);
    };

    const saveRecords = () => {
        fs.writeFileSync(file, JSON.stringify(records, null, 4));
    };

    getRecords();

    return {
        insert: (record) => {
            const nextId = Object.values(records).length + 1;
            const newRecord = {
                id: nextId,
                ...record,
            };
            records[nextId] = newRecord;
            saveRecords();
            return newRecord;
        },
        get: (id) => {
            if (id) {
                return records[id];
            }
            return Object.values(records);
        },
        update: (record) => {
            records[record.id] = record;
            saveRecords();
            return record;
        },
        delete: (record) => {
            delete records[record.id];
            saveRecords();
            return record;
        },
        search: (value, filters = []) => {
            if (!value) return Object.values(records);
            return Object.values(records).filter((r) => {
                const result = filters
                    .map(f => r[f])
                    .join()
                    .toLocaleLowerCase();
                return result.includes(value.toLocaleLowerCase());
            });
        },
    };
};

module.exports = createLocalDB;
