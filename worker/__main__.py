import json
import time
from pathlib import Path


def main() -> None:
    fixture = Path(__file__).parent.parent / "shared" / "fixtures" / "matches.json"
    matches = json.loads(fixture.read_text())
    print(json.dumps({"event": "worker_ready", "fixture_count": len(matches)}), flush=True)
    while True:
        time.sleep(60)


if __name__ == "__main__":
    main()
