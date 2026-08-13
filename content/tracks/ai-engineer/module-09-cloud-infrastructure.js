// Module 09 - Cloud & Infrastructure
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema" + v7 + v9).

// ---------------------------------------------------------------- shared SVG
// Generic frame builders, same conventions as module-01: every color is a CSS
// variable, viewBox 640x400, frames of one player share the layout.

function svgFrame(inner) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    inner + '</svg>';
}

function fHead(text) {
  return '<text x="20" y="28" font-size="15" fill="var(--muted)">' + text + '</text>';
}

function fPanel(headline, line1, line2, color) {
  return '<rect x="20" y="278" width="600" height="104" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="40" y="308" font-size="15" fill="' + color + '">' + headline + '</text>' +
    '<text x="40" y="334" font-size="13" fill="var(--muted)">' + line1 + '</text>' +
    '<text x="40" y="358" font-size="13" fill="var(--muted)">' + (line2 || '') + '</text>';
}

function fBox(x, y, w, h, title, sub, stroke) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + (sub ? h / 2 - 2 : h / 2 + 5)) + '" text-anchor="middle" font-size="15" fill="var(--text)">' + title + '</text>' +
    (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 20) + '" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text>' : '');
}

function fChip(x, y, w, label, fill, stroke) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="38" rx="9" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 25) + '" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>';
}

function fArrowR(x, y, len, color) {
  return '<line x1="' + x + '" y1="' + y + '" x2="' + (x + len - 9) + '" y2="' + y + '" stroke="' + color + '" stroke-width="2"/>' +
    '<polygon points="' + (x + len) + ',' + y + ' ' + (x + len - 11) + ',' + (y - 6) + ' ' + (x + len - 11) + ',' + (y + 6) + '" fill="' + color + '"/>';
}

function fArrowD(x, y, len, color) {
  return '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + len - 9) + '" stroke="' + color + '" stroke-width="2"/>' +
    '<polygon points="' + x + ',' + (y + len) + ' ' + (x - 6) + ',' + (y + len - 11) + ' ' + (x + 6) + ',' + (y + len - 11) + '" fill="' + color + '"/>';
}

function fText(x, y, text, size, color, anchor) {
  return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + color + '"' +
    (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + text + '</text>';
}

// ------------------------------------------------- lesson 2 player builders
// Autoscaling scene: users -> load balancer -> a row of VMs with CPU labels.

function vmChip(x, label, sub, stroke, opacity) {
  return '<g opacity="' + (opacity || 1) + '">' +
    '<rect x="' + x + '" y="196" width="130" height="60" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 65) + '" y="221" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 65) + '" y="243" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text></g>';
}

function asgFrame(reqLabel, reqColor, vms, arrows, headline, line1, line2, color) {
  return svgFrame(
    fHead('Traffic -> load balancer -> identical stateless VMs') +
    fBox(250, 40, 140, 46, 'users', '', 'var(--border)') +
    fText(400, 68, reqLabel, 14, reqColor) +
    fArrowD(320, 90, 26, 'var(--accent)') +
    fBox(230, 120, 180, 44, 'load balancer', '', 'var(--accent)') +
    arrows +
    vms +
    fPanel(headline, line1, line2, color)
  );
}

function asgArrow(toX) {
  return '<line x1="320" y1="164" x2="' + toX + '" y2="192" stroke="var(--accent)" stroke-width="2"/>';
}

// ------------------------------------------------- lesson 3 player builders
// Docker build scene: Dockerfile lines on the left, the layer stack on the right.

function dkLine(i, text, color) {
  return '<text x="36" y="' + (86 + i * 26) + '" font-size="13" fill="' + color + '">' + text + '</text>';
}

function dkLayer(i, label, fill, opacity, note) {
  var y = 226 - i * 36;
  return '<rect x="360" y="' + y + '" width="240" height="30" rx="7" fill="' + fill + '" opacity="' + opacity + '"/>' +
    '<text x="480" y="' + (y + 20) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>' +
    (note ? '<text x="612" y="' + (y + 20) + '" text-anchor="end" font-size="12" fill="var(--ok)">' + note + '</text>' : '');
}

function dkFrame(lines, layers, headline, line1, line2, color) {
  return svgFrame(
    fHead('docker build: every instruction becomes a layer') +
    '<rect x="20" y="50" width="290" height="180" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="36" y="72" font-size="13" fill="var(--muted)">Dockerfile</text>' +
    lines +
    '<text x="480" y="66" text-anchor="middle" font-size="13" fill="var(--muted)">image layers</text>' +
    layers +
    fPanel(headline, line1, line2, color)
  );
}

// ------------------------------------------------- lesson 4 player builders
// Kubernetes reconciliation scene: desired vs observed state, pods on nodes.

function k8sPod(x, label, sub, stroke, opacity) {
  return '<g opacity="' + (opacity || 1) + '">' +
    '<rect x="' + x + '" y="188" width="130" height="62" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 65) + '" y="214" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 65) + '" y="236" text-anchor="middle" font-size="12" fill="var(--muted)">' + sub + '</text></g>';
}

function k8sFrame(desired, observed, obsColor, pods, headline, line1, line2, color) {
  return svgFrame(
    fHead('The reconciliation loop: observe -> compare -> act') +
    fBox(20, 46, 290, 88, 'control plane', '', 'var(--accent)') +
    fText(165, 112, 'Deployment: myapp, image v...', 12, 'var(--muted)', 'middle') +
    '<rect x="330" y="46" width="290" height="88" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    fText(475, 76, 'desired: ' + desired, 14, 'var(--text)', 'middle') +
    fText(475, 102, 'observed: ' + observed, 14, obsColor, 'middle') +
    fText(475, 124, 'loop runs every moment', 11, 'var(--muted)', 'middle') +
    fArrowD(165, 138, 40, 'var(--accent)') +
    pods +
    fPanel(headline, line1, line2, color)
  );
}

// ------------------------------------------------- lesson 5 player builders
// Serverless scene: request stream, function instances appearing, running cost.

function srvFrame(reqText, reqColor, instances, costText, costColor, headline, line1, line2, color) {
  return svgFrame(
    fHead('Function instances appear per demand and vanish when idle') +
    '<rect x="20" y="44" width="290" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    fText(165, 76, reqText, 14, reqColor, 'middle') +
    '<rect x="330" y="44" width="290" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    fText(475, 76, costText, 14, costColor, 'middle') +
    instances +
    fPanel(headline, line1, line2, color)
  );
}

function srvInst(x, y, label, sub, stroke, opacity) {
  return '<g opacity="' + (opacity || 1) + '">' +
    '<rect x="' + x + '" y="' + y + '" width="140" height="58" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 70) + '" y="' + (y + 25) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 70) + '" y="' + (y + 45) + '" text-anchor="middle" font-size="12" fill="var(--muted)">' + sub + '</text></g>';
}

// ------------------------------------------------- lesson 6 player builders
// Monolith vs microservices: modules inside one box vs separate services.

function msModule(x, y, w, label, fill, opacity) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="40" rx="8" fill="' + fill + '" opacity="' + (opacity || 0.4) + '"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 25) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>';
}

function msService(x, y, label, sub, stroke, opacity) {
  return '<g opacity="' + (opacity || 1) + '">' +
    '<rect x="' + x + '" y="' + y + '" width="136" height="66" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 68) + '" y="' + (y + 27) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 68) + '" y="' + (y + 49) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + sub + '</text></g>';
}

// ------------------------------------------------- lesson 7 player builders
// Queue scene: producer -> queue (with depth) -> workers, DLQ below.

function qFrame(prodSub, depthLabel, depthW, depthColor, workers, dlqLabel, dlqColor, headline, line1, line2, color) {
  return svgFrame(
    fHead('Producer -> queue -> workers, decoupled in time') +
    fBox(20, 60, 150, 64, 'producer', prodSub, 'var(--accent)') +
    fArrowR(174, 92, 50, 'var(--accent)') +
    '<rect x="228" y="60" width="184" height="64" rx="12" fill="var(--surface)" stroke="' + depthColor + '" stroke-width="2"/>' +
    fText(320, 84, 'queue', 14, 'var(--text)', 'middle') +
    '<rect x="244" y="96" width="' + depthW + '" height="14" rx="4" fill="' + depthColor + '" opacity="0.7"/>' +
    fText(320, 142, depthLabel, 12, 'var(--muted)', 'middle') +
    fArrowR(416, 92, 50, 'var(--accent2)') +
    workers +
    '<rect x="228" y="178" width="184" height="50" rx="12" fill="var(--surface)" stroke="' + dlqColor + '" stroke-width="2"/>' +
    fText(320, 199, 'dead letter queue', 13, 'var(--text)', 'middle') +
    fText(320, 218, dlqLabel, 12, dlqColor, 'middle') +
    fPanel(headline, line1, line2, color)
  );
}

function qWorker(y, label, sub, stroke) {
  return '<rect x="470" y="' + y + '" width="150" height="52" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="545" y="' + (y + 22) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>' +
    '<text x="545" y="' + (y + 41) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + sub + '</text>';
}

// ------------------------------------------------- lesson 8 player builders
// Pipeline scene: commit info on top, a row of stages with statuses.

function plStage(i, label, sub, stroke, opacity) {
  var x = 20 + i * 124;
  return '<g opacity="' + (opacity || 1) + '">' +
    '<rect x="' + x + '" y="150" width="112" height="66" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 56) + '" y="177" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 56) + '" y="199" text-anchor="middle" font-size="11" fill="var(--muted)">' + sub + '</text></g>' +
    (i < 4 ? '<line x1="' + (x + 112) + '" y1="183" x2="' + (x + 124) + '" y2="183" stroke="var(--border)" stroke-width="2"/>' : '');
}

function plFrame(commitText, commitColor, stages, headline, line1, line2, color) {
  return svgFrame(
    fHead('push -> build -> test -> staging -> canary -> production') +
    '<rect x="20" y="46" width="600" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    fText(320, 78, commitText, 14, commitColor, 'middle') +
    stages +
    fPanel(headline, line1, line2, color)
  );
}

// ------------------------------------------------- lesson 1 player builders
// Responsibility stack: six layers, colored by who manages them.

var RESP_LAYERS = ['Application', 'Data', 'Runtime', 'OS', 'Virtualization', 'Hardware'];

function respFrame(youCount, modelName, example, headline, line1, line2, panelColor) {
  var rows = '';
  for (var i = 0; i < RESP_LAYERS.length; i++) {
    var mine = i < youCount;
    var y = 58 + i * 34;
    rows += '<rect x="150" y="' + y + '" width="270" height="28" rx="7" fill="' +
      (mine ? 'var(--accent)' : 'var(--accent2)') + '" opacity="' + (mine ? '0.85' : '0.55') + '"/>' +
      '<text x="285" y="' + (y + 19) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + RESP_LAYERS[i] + '</text>';
  }
  return svgFrame(
    fHead(modelName + ' - ' + example) +
    rows +
    '<rect x="460" y="70" width="14" height="14" rx="3" fill="var(--accent)" opacity="0.85"/>' +
    fText(482, 82, 'you manage', 13, 'var(--muted)') +
    '<rect x="460" y="98" width="14" height="14" rx="3" fill="var(--accent2)" opacity="0.55"/>' +
    fText(482, 110, 'provider', 13, 'var(--muted)') +
    fPanel(headline, line1, line2, panelColor)
  );
}

export default {
  id: 'cloud-infrastructure',
  order: 9,
  icon: '☁️',
  title: {
    pl: 'Chmura i infrastruktura',
    en: 'Cloud & Infrastructure'
  },
  description: {
    pl: 'Chmura od absolutnego zera: co naprawdę wynajmujesz, maszyny wirtualne i skalowanie, kontenery i Docker, Kubernetes, serverless, mikroserwisy, kolejki i zdarzenia oraz CI/CD.',
    en: 'Cloud from absolute zero: what you actually rent, virtual machines and scaling, containers and Docker, Kubernetes, serverless, microservices, queues and events, and CI/CD.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'what-is-cloud',
      title: {
        pl: 'Czym naprawdę jest chmura',
        en: 'What the cloud actually is'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'centrum danych', en: 'data center' },
          def: {
            pl: 'Fizyczny budynek pełen serwerów, z własnym zasilaniem, chłodzeniem i łączami. Chmura to nie żadna magia - to setki takich budynków należących do dostawcy, wynajmowanych przez API.',
            en: 'A physical building full of servers, with its own power, cooling and network links. The cloud is not magic - it is hundreds of such buildings owned by a provider and rented out through an API.'
          }
        },
        {
          term: { pl: 'region', en: 'region' },
          def: {
            pl: 'Geograficzna lokalizacja usług chmurowych, np. Frankfurt (eu-central-1) albo Warszawa. Wybierasz region blisko użytkowników, bo każdy tysiąc kilometrów to kilka-kilkanaście milisekund opóźnienia.',
            en: 'A geographic location of cloud services, e.g. Frankfurt (eu-central-1) or Warsaw. You pick a region close to your users, because every thousand kilometers adds milliseconds of latency.'
          }
        },
        {
          term: { pl: 'strefa dostępności (AZ)', en: 'availability zone (AZ)' },
          def: {
            pl: 'Wydzielona, niezależna część regionu - osobny budynek lub grupa budynków z własnym zasilaniem. Region ma zwykle 3 strefy; awaria jednej nie zabiera pozostałych, więc aplikację stawia się w co najmniej dwóch.',
            en: 'An isolated, independent slice of a region - a separate building or group of buildings with its own power. A region usually has 3 zones; one failing does not take out the others, so you run your app in at least two.'
          }
        },
        {
          term: { pl: 'IaaS', en: 'IaaS' },
          def: {
            pl: 'Infrastructure as a Service - wynajmujesz sam komputer (maszynę wirtualną, dysk, sieć), a wszystko powyżej: system, środowisko uruchomieniowe i aplikacja, to twoja odpowiedzialność. Przykład: AWS EC2.',
            en: 'Infrastructure as a Service - you rent the bare computer (a virtual machine, disk, network) and everything above it: the OS, the runtime and the app, is your responsibility. Example: AWS EC2.'
          }
        },
        {
          term: { pl: 'PaaS', en: 'PaaS' },
          def: {
            pl: 'Platform as a Service - oddajesz kod, a platforma sama go buduje, uruchamia i skaluje. Vercel, Netlify, Heroku czy GitHub Pages to właśnie PaaS - używasz go od dawna, tylko nikt ci nie powiedział, jak to się nazywa.',
            en: 'Platform as a Service - you hand over code and the platform builds, runs and scales it for you. Vercel, Netlify, Heroku or GitHub Pages are PaaS - you have been using it for years, just without the label.'
          }
        },
        {
          term: { pl: 'SaaS', en: 'SaaS' },
          def: {
            pl: 'Software as a Service - gotowa aplikacja w przeglądarce, za którą płacisz abonament: Gmail, Figma, Slack. Ty niczym nie zarządzasz, dostawca zarządza wszystkim.',
            en: 'Software as a Service - a finished application in the browser that you subscribe to: Gmail, Figma, Slack. You manage nothing, the provider manages everything.'
          }
        },
        {
          term: { pl: 'model współodpowiedzialności', en: 'shared responsibility model' },
          def: {
            pl: 'Formalny podział: dostawca odpowiada za bezpieczeństwo SAMEJ chmury (budynki, sprzęt, hypervisor), a ty za bezpieczeństwo W chmurze (system, dane, uprawnienia, twój kod). Klasyczne pytanie rekrutacyjne.',
            en: 'The formal split: the provider secures the cloud ITSELF (buildings, hardware, hypervisor) and you secure what is IN the cloud (OS, data, permissions, your code). A classic interview question.'
          }
        },
        {
          term: { pl: 'egress', en: 'egress' },
          def: {
            pl: 'Ruch wychodzący z chmury do internetu. Wysyłanie danych DO chmury jest zwykle darmowe, wysyłanie ICH Z chmury kosztuje (rzędu 0,09 USD za GB) - to najczęstsza niespodzianka na pierwszym rachunku.',
            en: 'Traffic leaving the cloud toward the internet. Sending data INTO the cloud is usually free, sending it OUT costs money (around 0.09 USD per GB) - the most common surprise on a first bill.'
          }
        },
        {
          term: { pl: 'IAM', en: 'IAM' },
          def: {
            pl: 'Identity and Access Management - system kont, ról i uprawnień w chmurze. Odpowiada na pytanie "kto może zrobić co z którym zasobem", jak rozbudowany RBAC znany z backendów.',
            en: 'Identity and Access Management - the accounts, roles and permissions system of a cloud. It answers "who may do what to which resource", like an elaborate RBAC known from backends.'
          }
        },
        {
          term: { pl: 'bucket (magazyn obiektów)', en: 'bucket (object storage)' },
          def: {
            pl: 'Nazwany pojemnik na pliki w magazynie obiektów (S3, Blob Storage, Cloud Storage): trwały słownik klucz-plik bez systemu plików i bez serwera. Awatary, PDF-y, backupy i artefakty buildów mieszkają właśnie w bucketach.',
            en: 'A named container for files in object storage (S3, Blob Storage, Cloud Storage): a durable key-to-file store with no filesystem and no server. Avatars, PDFs, backups and build artifacts all live in buckets.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="26" width="150" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="95" y="52" text-anchor="middle" font-size="15" fill="var(--text)">Your app</text>' +
          '<text x="95" y="74" text-anchor="middle" font-size="13" fill="var(--muted)">API call / deploy</text>' +
          '<line x1="170" y1="56" x2="235" y2="56" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c1)"/>' +
          '<rect x="240" y="16" width="380" height="300" rx="14" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="430" y="44" text-anchor="middle" font-size="15" fill="var(--text)">Region: eu-central-1 (Frankfurt)</text>' +
          '<rect x="258" y="62" width="106" height="180" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="311" y="88" text-anchor="middle" font-size="14" fill="var(--text)">AZ-a</text>' +
          '<rect x="272" y="104" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="272" y="146" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="272" y="188" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="376" y="62" width="106" height="180" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="429" y="88" text-anchor="middle" font-size="14" fill="var(--text)">AZ-b</text>' +
          '<rect x="390" y="104" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="390" y="146" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="390" y="188" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="494" y="62" width="106" height="180" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="547" y="88" text-anchor="middle" font-size="14" fill="var(--text)">AZ-c</text>' +
          '<rect x="508" y="104" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="508" y="146" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<rect x="508" y="188" width="78" height="34" rx="7" fill="var(--accent2)" opacity="0.5"/>' +
          '<text x="430" y="268" text-anchor="middle" font-size="13" fill="var(--muted)">each AZ = separate buildings, power, cooling</text>' +
          '<text x="430" y="292" text-anchor="middle" font-size="13" fill="var(--muted)">servers rented by the second</text>' +
          '<rect x="20" y="336" width="600" height="84" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="366" text-anchor="middle" font-size="15" fill="var(--text)">Cloud = renting slices of these buildings via an API</text>' +
          '<text x="320" y="392" text-anchor="middle" font-size="13" fill="var(--muted)">pay per second of use, run in 2+ AZs so one failure does not kill you</text>' +
          '</svg>',
        caption: {
          pl: 'Region to miasto z kilkoma niezależnymi strefami dostępności (AZ); w każdej stoją fizyczne serwery, których kawałki wynajmujesz przez API.',
          en: 'A region is a city with a few independent availability zones (AZs); each holds physical servers whose slices you rent through an API.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'IaaS, PaaS, SaaS: te trzy skróty opisują tylko jedno - jak wysoko sięga odpowiedzialność dostawcy, a gdzie zaczyna się twoja.',
            en: 'IaaS, PaaS, SaaS: the three acronyms describe one thing - how far up the provider responsibility reaches and where yours begins.'
          },
          frames: [
            {
              svg: respFrame(6, 'On-premises', 'your own server room',
                'You manage the entire stack', 'Buying hardware, replacing dead disks, patching the OS, deploying the app.',
                'This is what companies did before the cloud - and what the cloud replaces.', 'var(--accent)'),
              label: { pl: '1. Własna serwerownia', en: '1. On-premises' },
              note: {
                pl: 'Punkt odniesienia: firma kupuje serwery i utrzymuje wszystko sama, od sprzętu po aplikację. Drogo, wolno, ale pełna kontrola.',
                en: 'The baseline: the company buys servers and maintains everything itself, from hardware to app. Expensive and slow, but full control.'
              }
            },
            {
              svg: respFrame(4, 'IaaS', 'AWS EC2, Azure VM',
                'Provider takes hardware and virtualization', 'You get a virtual machine and everything below it is not your problem.',
                'You still install, patch and secure the OS, runtime and app yourself.', 'var(--accent2)'),
              label: { pl: '2. IaaS - wynajęty komputer', en: '2. IaaS - a rented computer' },
              note: {
                pl: 'Infrastructure as a Service: dostajesz maszynę wirtualną. Dostawca martwi się o prąd i sprzęt, ty o system operacyjny i wszystko powyżej.',
                en: 'Infrastructure as a Service: you get a virtual machine. The provider worries about power and hardware, you about the OS and everything above it.'
              }
            },
            {
              svg: respFrame(2, 'PaaS', 'Vercel, Heroku, GitHub Pages',
                'Provider runs the platform, you ship code', 'git push - and building, runtime, scaling and TLS are handled for you.',
                'Only the application itself and its data remain yours.', 'var(--accent2)'),
              label: { pl: '3. PaaS - oddajesz kod', en: '3. PaaS - you hand over code' },
              note: {
                pl: 'Platform as a Service: znasz to z Vercela i GitHub Pages. Ty piszesz aplikację, platforma ją buduje, hostuje i skaluje. To dlatego frontendowiec może latami nie wiedzieć, że "robi chmurę".',
                en: 'Platform as a Service: you know this from Vercel and GitHub Pages. You write the app, the platform builds, hosts and scales it. This is why a frontend dev can do cloud for years without noticing.'
              }
            },
            {
              svg: respFrame(0, 'SaaS', 'Gmail, Figma, Slack',
                'Provider manages everything, you just log in', 'The whole stack including the application is the vendor problem.',
                'You configure and use - nothing to deploy, nothing to patch.', 'var(--ok)'),
              label: { pl: '4. SaaS - gotowa aplikacja', en: '4. SaaS - a finished app' },
              note: {
                pl: 'Software as a Service: kupujesz działający produkt w przeglądarce. Cała drabina odpowiedzialności po stronie dostawcy - ty tylko płacisz abonament.',
                en: 'Software as a Service: you buy a working product in the browser. The whole responsibility ladder sits with the vendor - you just pay the subscription.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Sto lat temu fabryka, która chciała mieć prąd, budowała własną elektrownię: kotły, turbiny, ludzie do obsługi. Potem ktoś wpadł na pomysł, żeby prąd robić w jednym wielkim miejscu, a do fabryk pociągnąć kable. Dziś nikt nie buduje elektrowni, żeby zagotować czajnik - wtykasz wtyczkę do gniazdka i płacisz za tyle prądu, ile zużyłeś.</p>' +
            '<p><strong>Chmura to dokładnie to samo, tylko z komputerami.</strong> Amazon, Microsoft i Google postawili gigantyczne hale pełne serwerów. Zamiast kupować własny serwer, wypożyczasz kawałek ich hali: na godzinę, na miesiąc, na jedną sekundę. Skończyłeś - oddajesz i przestajesz płacić.</p>' +
            '<p>W gniazdku nie widzisz, z której elektrowni płynie prąd, i tak samo w chmurze nie wiesz, na którym dokładnie fizycznym serwerze działa twoja aplikacja. I to jest zaleta: gdy jeden serwer się psuje, twoja aplikacja dostaje inny, tak jak prąd płynie dalej, choć jedna turbina stanęła.</p>' +
            '<p>Jest tylko jedna pułapka, znana każdemu, kto zostawił włączony grzejnik: licznik bije cały czas. Zapomniana, niepotrzebna maszyna w chmurze potrafi naliczać rachunek miesiącami. Dlatego dorośli w chmurze najpierw uczą się nie tego, jak coś włączyć, tylko jak sprawdzić, co jest włączone.</p>',
          en: '<p>A hundred years ago a factory that wanted electricity built its own power plant: boilers, turbines, staff to run it all. Then someone had the idea of making power in one big place and running cables to the factories. Today nobody builds a power plant to boil a kettle - you plug into the socket and pay for exactly what you used.</p>' +
            '<p><strong>The cloud is the same thing, but with computers.</strong> Amazon, Microsoft and Google built gigantic halls full of servers. Instead of buying your own server, you borrow a slice of their hall: for an hour, for a month, for a single second. When you are done, you hand it back and stop paying.</p>' +
            '<p>Looking at the socket you cannot tell which power plant your electricity comes from, and in the cloud you do not know which exact physical server runs your app. That is a feature: when one server breaks, your app gets another one, just like power keeps flowing although one turbine stopped.</p>' +
            '<p>There is one trap, familiar to anyone who left a heater on: the meter never stops. A forgotten, unneeded machine in the cloud can keep billing you for months. That is why grown-ups in the cloud first learn not how to switch things on, but how to check what is on.</p>'
        },
        school: {
          pl: '<p><strong>Chmura obliczeniowa</strong> (cloud computing) to wynajmowanie komputerów, dysków i sieci przez internet, rozliczane za faktyczne zużycie - z sekundową dokładnością. Fizycznie to <strong>centra danych</strong> (data centers): budynki pełne serwerów z własnym zasilaniem i chłodzeniem, należące do dostawcy. Trzej najwięksi dostawcy, których nazwy musisz kojarzyć, to <strong>AWS</strong> (Amazon Web Services), <strong>Azure</strong> (Microsoft) i <strong>GCP</strong> (Google Cloud Platform).</p>' +
            '<p>Geografia ma tu znaczenie. <strong>Region</strong> to lokalizacja, np. Frankfurt albo Warszawa. Każdy region dzieli się na 2-3 <strong>strefy dostępności</strong> (availability zones, AZ) - niezależne budynki z osobnym prądem i łączami, oddalone o kilometry. Po co? Żeby pożar czy awaria zasilania w jednym budynku nie położyły całego regionu. Poważna aplikacja działa zawsze w co najmniej dwóch strefach naraz.</p>' +
            '<h4>Trzy modele usług - drabina odpowiedzialności</h4>' +
            '<ul>' +
            '<li><strong>IaaS</strong> (Infrastructure as a Service): wynajmujesz goły komputer - maszynę wirtualną. System operacyjny, aktualizacje, środowisko uruchomieniowe: twoja sprawa. Przykład: EC2 w AWS.</li>' +
            '<li><strong>PaaS</strong> (Platform as a Service): oddajesz kod, platforma go buduje, uruchamia i skaluje. To jest Vercel, Netlify, Heroku - i GitHub Pages, na którym stoi ta aplikacja. Robisz chmurę od lat, tylko bez tej etykiety.</li>' +
            '<li><strong>SaaS</strong> (Software as a Service): gotowa aplikacja w przeglądarce - Gmail, Figma, Slack. Nic nie hostujesz, płacisz abonament.</li>' +
            '</ul>' +
            '<h4>Worked example: ile to kosztuje</h4>' +
            '<p>Mała maszyna wirtualna (2 vCPU, 4 GB RAM) kosztuje około 30 USD miesięcznie, jeśli działa non stop. Przechowanie 1 GB plików w magazynie obiektów (np. S3) to około 0,02 USD miesięcznie. Ale uwaga na <strong>egress</strong>, czyli ruch wychodzący: pobranie tych danych Z chmury do internetu kosztuje około 0,09 USD za GB. Wrzucanie danych do chmury jest darmowe - wyciąganie ich już nie. Ta asymetria to świadomy model biznesowy: dane łatwo wchodzą, trudniej wychodzą.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Chmura = cudze serwery wynajmowane przez API i rozliczane za zużycie. Region dzieli się na strefy dostępności i w dwóch strefach trzyma się aplikację, żeby przeżyła awarię budynku. IaaS, PaaS i SaaS różnią się tylko tym, ile warstw bierze na siebie dostawca - a Vercel i GitHub Pages, których używasz od dawna, to po prostu PaaS.</p>',
          en: '<p><strong>Cloud computing</strong> means renting computers, disks and networking over the internet, billed by actual usage - down to the second. Physically it is <strong>data centers</strong>: buildings full of servers with their own power and cooling, owned by a provider. The big three providers you must recognize are <strong>AWS</strong> (Amazon Web Services), <strong>Azure</strong> (Microsoft) and <strong>GCP</strong> (Google Cloud Platform).</p>' +
            '<p>Geography matters here. A <strong>region</strong> is a location, e.g. Frankfurt or Warsaw. Each region splits into 2-3 <strong>availability zones</strong> (AZs) - independent buildings with separate power and links, kilometers apart. Why? So a fire or power failure in one building cannot take down the whole region. A serious application always runs in at least two zones at once.</p>' +
            '<h4>The three service models - a ladder of responsibility</h4>' +
            '<ul>' +
            '<li><strong>IaaS</strong> (Infrastructure as a Service): you rent a bare computer - a virtual machine. The operating system, patches and runtime are your problem. Example: EC2 on AWS.</li>' +
            '<li><strong>PaaS</strong> (Platform as a Service): you hand over code and the platform builds, runs and scales it. That is Vercel, Netlify, Heroku - and GitHub Pages, which hosts this very app. You have been doing cloud for years, just without the label.</li>' +
            '<li><strong>SaaS</strong> (Software as a Service): a finished application in the browser - Gmail, Figma, Slack. You host nothing and pay a subscription.</li>' +
            '</ul>' +
            '<h4>Worked example: what it costs</h4>' +
            '<p>A small virtual machine (2 vCPU, 4 GB RAM) costs about 30 USD per month if it runs non stop. Storing 1 GB of files in object storage (e.g. S3) is about 0.02 USD per month. But watch out for <strong>egress</strong>, the outbound traffic: downloading that data OUT of the cloud to the internet costs about 0.09 USD per GB. Uploading into the cloud is free - getting it back out is not. The asymmetry is a deliberate business model: data enters easily and leaves reluctantly.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Cloud = servers owned by somebody else, rented through an API and billed by usage. A region splits into availability zones and you run your app in two of them so it survives a building failure. IaaS, PaaS and SaaS differ only in how many layers the provider takes on - and Vercel and GitHub Pages, which you already use, are simply PaaS.</p>'
        },
        pro: {
          pl: '<p>Na poziomie produkcyjnym chmura to przede wszystkim <strong>model odpowiedzialności i model kosztów</strong>, nie technologia. Zacznijmy od odpowiedzialności, bo od tego zaczyna się każdy audyt i niejedna rozmowa kwalifikacyjna. <strong>Model współodpowiedzialności</strong> (shared responsibility model) mówi: dostawca odpowiada za bezpieczeństwo SAMEJ chmury - budynki, sprzęt, <strong>hypervisor</strong> (oprogramowanie, które kroi fizyczny serwer na maszyny wirtualne); ty odpowiadasz za bezpieczeństwo tego, co W chmurze - system operacyjny na twojej maszynie IaaS, konfigurację sieci, uprawnienia, dane i kod. Praktyczny wniosek: jak wyciekną dane z twojego niezabezpieczonego bucketa S3, to nie jest wina Amazona.</p>' +
            '<p>Do zarządzania tym służy <strong>IAM</strong> (Identity and Access Management): konta, role i polityki uprawnień w stylu "ta rola może czytać z tego bucketa, ale nie może niczego kasować". Reguła zawodowa: <strong>least privilege</strong> - każda usługa dostaje minimalny zestaw uprawnień, który wystarcza do działania. Znasz to z modułu o bezpieczeństwie LLM; w chmurze to samo, tylko na poziomie infrastruktury.</p>' +
            '<h4>Jedna tabela zamiast trzech żargonów</h4>' +
            '<p>Każdy dostawca nazywa te same klocki inaczej. Ta tabela załatwia 80 procent szumu w ogłoszeniach o pracę:</p>' +
            '<table>' +
            '<tr><th>Klocek</th><th>AWS</th><th>Azure</th><th>GCP</th></tr>' +
            '<tr><td>Maszyna wirtualna</td><td>EC2</td><td>Virtual Machines</td><td>Compute Engine</td></tr>' +
            '<tr><td>Magazyn obiektów</td><td>S3</td><td>Blob Storage</td><td>Cloud Storage</td></tr>' +
            '<tr><td>Zarządzana baza SQL</td><td>RDS</td><td>Azure SQL</td><td>Cloud SQL</td></tr>' +
            '<tr><td>Funkcje serverless</td><td>Lambda</td><td>Functions</td><td>Cloud Functions</td></tr>' +
            '<tr><td>Zarządzany Kubernetes</td><td>EKS</td><td>AKS</td><td>GKE</td></tr>' +
            '</table>' +
            '<p><strong>Magazyn obiektów</strong> (object storage) wymaga słowa wyjaśnienia, bo to najczęściej używana usługa świata: przechowuje pliki jako obiekty pod kluczami (jak gigantyczny, trwały słownik klucz-wartość na pliki), bez systemu plików i bez serwera, za grosze. Awatary, PDF-y, backupy, artefakty buildów - wszystko tam mieszka.</p>' +
            '<h4>Liczby, które warto mieć w głowie</h4>' +
            '<ul>' +
            '<li>Opóźnienie z Polski do Frankfurtu (eu-central-1): 20-30 ms w obie strony. Do Wirginii (us-east-1): około 120 ms. Wybór regionu to decyzja o UX.</li>' +
            '<li>Między strefami dostępności w regionie: 1-2 ms - dlatego rozciągnięcie aplikacji na 2-3 AZ jest praktycznie darmowe wydajnościowo.</li>' +
            '<li>Egress do internetu: około 0,09 USD/GB. Serwowanie wideo albo dużych modeli bez CDN-a potrafi kosztować więcej niż całe compute.</li>' +
            '<li>Rezerwacja na 1-3 lata (reserved/committed use) tnie cenę VM o 30-60 procent względem płacenia na żądanie.</li>' +
            '</ul>' +
            '<h4>Jak się z tym rozmawia</h4>' +
            '<p>Z chmurą pracujesz przez cztery interfejsy: konsolę webową (do nauki i podglądu), <strong>CLI</strong> (narzędzie wiersza poleceń, np. <code>aws s3 ls</code>), <strong>SDK</strong> (biblioteki do kodu, np. klient S3 w TypeScript) oraz <strong>IaC</strong> (Infrastructure as Code - infrastruktura opisana w plikach, o tym w lekcji o CI/CD). Zawodowa zasada: konsolą się ogląda, zmiany robi się kodem, bo klikane zmiany są niepowtarzalne i nieaudytowalne.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Zanim porównasz usługi, ustal warstwę: czy to IaaS, PaaS czy SaaS - wtedy tabelka nazw dostawców robi się trywialna.</li>' +
            '<li>W projekcie pytaj najpierw o region (latencja, wymogi prawne na dane) i o to, kto płaci za egress - to dwie decyzje, których nie da się tanio odwrócić.</li>' +
            '<li>Traktuj uprawnienia IAM jak typy w TypeScript: ciasne od początku, bo rozluźnić zawsze można, a zacieśnić po fakcie boli.</li>' +
            '</ul>',
          en: '<p>At the production level the cloud is first of all <strong>a responsibility model and a cost model</strong>, not a technology. Start with responsibility, because every audit and many an interview starts there. The <strong>shared responsibility model</strong> says: the provider secures the cloud ITSELF - buildings, hardware, the <strong>hypervisor</strong> (the software that slices a physical server into virtual machines); you secure what is IN the cloud - the OS on your IaaS machine, network configuration, permissions, data and code. Practical consequence: when data leaks from your misconfigured S3 bucket, that is on you, not on Amazon.</p>' +
            '<p>The tool for managing this is <strong>IAM</strong> (Identity and Access Management): accounts, roles and permission policies in the style of "this role may read from this bucket but may not delete anything". The professional rule is <strong>least privilege</strong> - every service gets the minimal set of permissions it needs to function. You know the idea from the LLM security module; in the cloud it is the same, one layer down.</p>' +
            '<h4>One table instead of three jargons</h4>' +
            '<p>Every provider names the same building blocks differently. This table removes 80 percent of the noise in job ads:</p>' +
            '<table>' +
            '<tr><th>Block</th><th>AWS</th><th>Azure</th><th>GCP</th></tr>' +
            '<tr><td>Virtual machine</td><td>EC2</td><td>Virtual Machines</td><td>Compute Engine</td></tr>' +
            '<tr><td>Object storage</td><td>S3</td><td>Blob Storage</td><td>Cloud Storage</td></tr>' +
            '<tr><td>Managed SQL database</td><td>RDS</td><td>Azure SQL</td><td>Cloud SQL</td></tr>' +
            '<tr><td>Serverless functions</td><td>Lambda</td><td>Functions</td><td>Cloud Functions</td></tr>' +
            '<tr><td>Managed Kubernetes</td><td>EKS</td><td>AKS</td><td>GKE</td></tr>' +
            '</table>' +
            '<p><strong>Object storage</strong> deserves a sentence, because it is the most used service in the world: it stores files as objects under keys (like a gigantic, durable key-value store for files), with no file system and no server, for pennies. Avatars, PDFs, backups, build artifacts - they all live there.</p>' +
            '<h4>Numbers worth carrying in your head</h4>' +
            '<ul>' +
            '<li>Round-trip latency from Poland to Frankfurt (eu-central-1): 20-30 ms. To Virginia (us-east-1): about 120 ms. Region choice is a UX decision.</li>' +
            '<li>Between availability zones inside a region: 1-2 ms - which is why stretching an app across 2-3 AZs is performance-free in practice.</li>' +
            '<li>Egress to the internet: about 0.09 USD/GB. Serving video or large models without a CDN can cost more than all your compute.</li>' +
            '<li>Reserving capacity for 1-3 years (reserved / committed use) cuts VM prices by 30-60 percent versus on-demand.</li>' +
            '</ul>' +
            '<h4>How you talk to it</h4>' +
            '<p>You work with a cloud through four interfaces: the web console (for learning and inspection), the <strong>CLI</strong> (command line tool, e.g. <code>aws s3 ls</code>), the <strong>SDK</strong> (code libraries, e.g. an S3 client in TypeScript) and <strong>IaC</strong> (Infrastructure as Code - infrastructure described in files, covered in the CI/CD lesson). The professional rule: the console is for looking, changes are made in code, because clicked changes are unrepeatable and unauditable.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Before comparing services, establish the layer: is it IaaS, PaaS or SaaS - then the provider-name table becomes trivial.</li>' +
            '<li>On a project, ask first about the region (latency, legal requirements on data) and who pays for egress - the two decisions that are expensive to reverse.</li>' +
            '<li>Treat IAM permissions like TypeScript types: strict from day one, because loosening is always easy and tightening after the fact hurts.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kolega mówi: "chmura to po prostu czyjś komputer". Co jest najbliższe prawdy?',
            en: 'A friend says "the cloud is just computers owned by somebody else". What is closest to the truth?'
          },
          options: [
            { pl: 'To nieprawda - chmura nie używa fizycznych serwerów', en: 'False - the cloud does not use physical servers' },
            { pl: 'Prawda z gwiazdką: to setki cudzych serwerów w centrach danych, wynajmowanych przez API i rozliczanych za faktyczne zużycie', en: 'True with an asterisk: hundreds of servers owned by somebody else, sitting in data centers, rented through an API and billed by actual usage' },
            { pl: 'Chmura to technologia przechowywania danych wyłącznie w przeglądarce', en: 'The cloud is a technology for storing data only in the browser' },
            { pl: 'Chmura to inna nazwa internetu', en: 'The cloud is another name for the internet' }
          ],
          correct: 1,
          explain: {
            pl: 'Fizycznie to zwykłe serwery w budynkach dostawcy. Nowość polega na modelu: wynajem przez API, płatność za zużycie i zwrot, kiedy chcesz - jak prąd z gniazdka.',
            en: 'Physically these are ordinary servers in provider buildings. The novelty is the model: rent via API, pay for usage, hand back whenever - like power from a socket.'
          }
        },
        {
          q: {
            pl: 'Po co region chmurowy dzieli się na kilka stref dostępności (AZ)?',
            en: 'Why does a cloud region split into several availability zones (AZs)?'
          },
          options: [
            { pl: 'Żeby dane szybciej się kompresowały', en: 'So data compresses faster' },
            { pl: 'Bo prawo wymaga oddzielnych budynków dla różnych firm', en: 'Because the law requires separate buildings for different companies' },
            { pl: 'Żeby awaria jednego budynku (prąd, pożar) nie położyła całej aplikacji - stawiasz ją w 2+ strefach naraz', en: 'So one building failing (power, fire) cannot take the whole app down - you run it in 2+ zones at once' },
            { pl: 'Żeby każdy klient dostał własny budynek', en: 'So every customer gets a building of their own' }
          ],
          correct: 2,
          explain: {
            pl: 'Strefy to niezależne budynki z osobnym zasilaniem, oddalone o kilometry, ale połączone szybką siecią (1-2 ms). Aplikacja w dwóch strefach przeżywa awarię jednej z nich.',
            en: 'Zones are independent buildings with separate power, kilometers apart but linked by a fast network (1-2 ms). An app in two zones survives the loss of one.'
          }
        },
        {
          q: {
            pl: 'Wrzucasz kod na Vercel: platforma sama go buduje, hostuje i skaluje. Który to model usługi?',
            en: 'You push code to Vercel: the platform builds, hosts and scales it for you. Which service model is that?'
          },
          options: [
            { pl: 'PaaS - platforma jako usługa: ty dajesz kod, dostawca prowadzi całą resztę', en: 'PaaS - platform as a service: you bring code, the provider runs everything else' },
            { pl: 'IaaS - bo Vercel daje ci maszynę wirtualną do samodzielnej konfiguracji', en: 'IaaS - because Vercel gives you a virtual machine to configure yourself' },
            { pl: 'SaaS - bo Vercel jest aplikacją w przeglądarce', en: 'SaaS - because Vercel is an app in the browser' },
            { pl: 'On-premises - bo build działa na twoim laptopie', en: 'On-premises - because the build runs on your laptop' }
          ],
          correct: 0,
          explain: {
            pl: 'W PaaS granica przebiega na kodzie: aplikacja i dane są twoje, build, runtime, skalowanie i TLS należą do platformy. SaaS byłby wtedy, gdybyś tylko używał gotowej aplikacji, a IaaS - gdybyś sam zarządzał systemem operacyjnym.',
            en: 'In PaaS the boundary is at the code: the app and its data are yours, while build, runtime, scaling and TLS belong to the platform. SaaS would mean only using a finished app, and IaaS would mean managing the OS yourself.'
          }
        },
        {
          q: {
            pl: 'Firma trzyma aplikację na wynajętej maszynie wirtualnej (IaaS). Wychodzi krytyczna luka w systemie operacyjnym tej maszyny. Kto ma obowiązek załatać system?',
            en: 'A company runs its app on a rented virtual machine (IaaS). A critical vulnerability appears in the operating system of that machine. Whose job is the patch?'
          },
          options: [
            { pl: 'Dostawca chmury - w końcu to jego serwer', en: 'The cloud provider - it is their server after all' },
            { pl: 'Nikt - maszyny wirtualne nie mają systemu operacyjnego', en: 'Nobody - virtual machines have no operating system' },
            { pl: 'Producent procesora, bo luka dotyczy sprzętu', en: 'The CPU vendor, because the bug concerns hardware' },
            { pl: 'Firma - w modelu współodpowiedzialności system NA maszynie IaaS należy do klienta, dostawca odpowiada za sprzęt i hypervisor', en: 'The company - under shared responsibility the OS ON an IaaS machine belongs to the customer; the provider covers hardware and hypervisor' }
          ],
          correct: 3,
          explain: {
            pl: 'To sedno modelu współodpowiedzialności: dostawca zabezpiecza chmurę (budynki, sprzęt, hypervisor), klient to, co w chmurze (system, konfiguracja, dane, kod). W IaaS system operacyjny jest po stronie klienta - i o to pytają na rozmowach.',
            en: 'This is the heart of shared responsibility: the provider secures the cloud (buildings, hardware, hypervisor), the customer secures what is in it (OS, config, data, code). On IaaS the OS is on the customer side - a favorite interview probe.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'compute-scaling-networking',
      title: {
        pl: 'Maszyny wirtualne, skalowanie i sieć',
        en: 'Virtual machines, scaling and networking'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'maszyna wirtualna (VM)', en: 'virtual machine (VM)' },
          def: {
            pl: 'Udawany komputer wykrojony programowo z prawdziwego serwera: ma własny system operacyjny, procesor i dysk, ale fizycznie dzieli sprzęt z kilkoma innymi VM-kami. Podstawowa jednostka wynajmu w IaaS.',
            en: 'A pretend computer carved out of a real server in software: it has its own OS, CPU and disk, but physically shares hardware with a few other VMs. The basic rental unit of IaaS.'
          }
        },
        {
          term: { pl: 'hypervisor', en: 'hypervisor' },
          def: {
            pl: 'Warstwa oprogramowania na fizycznym serwerze, która kroi go na maszyny wirtualne i pilnuje, żeby żadna nie widziała pozostałych. To dzięki niemu dostawca może wynająć jeden serwer dziesięciu klientom naraz.',
            en: 'The software layer on a physical server that slices it into virtual machines and makes sure none of them can see the others. It is what lets a provider rent one server to ten customers at once.'
          }
        },
        {
          term: { pl: 'load balancer', en: 'load balancer' },
          def: {
            pl: 'Rozdzielacz ruchu: jedno publiczne wejście, które rozkłada żądania na wiele identycznych maszyn i omija te, które nie przechodzą health checków. Jak nginx w trybie upstream, tylko zarządzany przez chmurę.',
            en: 'A traffic splitter: one public entry point that spreads requests across many identical machines and skips the ones failing health checks. Like nginx with an upstream block, but managed by the cloud.'
          }
        },
        {
          term: { pl: 'health check', en: 'health check' },
          def: {
            pl: 'Cykliczne odpytywanie maszyny (np. GET /health co 10 s), którym load balancer sprawdza, czy instancja żyje. Kilka nieudanych odpowiedzi z rzędu = maszyna wypada z rotacji, zanim użytkownicy zobaczą błędy.',
            en: 'A periodic probe (e.g. GET /health every 10 s) the load balancer uses to see if an instance is alive. A few failed responses in a row = the machine drops out of rotation before users see errors.'
          }
        },
        {
          term: { pl: 'skalowanie wertykalne vs horyzontalne', en: 'vertical vs horizontal scaling' },
          def: {
            pl: 'Wertykalne: wymień maszynę na większą (więcej vCPU i RAM) - proste, ale ma sufit i zwykle wymaga restartu. Horyzontalne: dostaw więcej identycznych maszyn za load balancerem - bez sufitu i przy okazji odporne na awarię jednej sztuki. Chmura preferuje horyzontalne.',
            en: 'Vertical: swap the machine for a bigger one (more vCPU and RAM) - simple, but it has a ceiling and usually needs a restart. Horizontal: add more identical machines behind a load balancer - no ceiling, plus resilience to one machine dying. The cloud strongly prefers horizontal.'
          }
        },
        {
          term: { pl: 'autoscaling', en: 'autoscaling' },
          def: {
            pl: 'Automat, który dokłada maszyny, gdy metryka (np. średnie CPU) przekracza cel, i zabiera je, gdy ruch spada. Konfigurujesz minimum, maksimum i metrykę celu - resztą zajmuje się chmura.',
            en: 'An automat that adds machines when a metric (e.g. average CPU) exceeds a target and removes them when traffic drops. You configure a minimum, a maximum and a target metric - the cloud does the rest.'
          }
        },
        {
          term: { pl: 'stateless', en: 'stateless' },
          def: {
            pl: 'Aplikacja, która nie trzyma niczego ważnego na lokalnym dysku ani w pamięci między żądaniami - sesje i pliki idą do bazy, Redisa lub magazynu obiektów. Warunek konieczny skalowania horyzontalnego: każde żądanie może trafić na dowolną maszynę.',
            en: 'An app that keeps nothing important on local disk or in memory between requests - sessions and files go to a database, Redis or object storage. The precondition of horizontal scaling: any request may land on any machine.'
          }
        },
        {
          term: { pl: 'VPC', en: 'VPC' },
          def: {
            pl: 'Virtual Private Cloud - twoja prywatna, odizolowana sieć w chmurze. Dzieli się na podsieci publiczne (widoczne z internetu, np. load balancer) i prywatne (baza danych, backendy), do których z zewnątrz nie ma wstępu.',
            en: 'Virtual Private Cloud - your private, isolated network inside the cloud. It splits into public subnets (reachable from the internet, e.g. the load balancer) and private ones (database, backends) with no way in from outside.'
          }
        },
        {
          term: { pl: 'security group', en: 'security group' },
          def: {
            pl: 'Firewall przypięty do maszyny lub usługi: lista reguł "kto może się dostać na który port". Typowy układ: load balancer wpuszcza port 443 ze świata, VM-ki wpuszczają ruch tylko od load balancera, baza tylko od VM-ek.',
            en: 'A firewall attached to a machine or service: rules for "who may reach which port". Typical setup: the load balancer accepts 443 from the world, VMs accept traffic only from the load balancer, the database only from the VMs.'
          }
        },
        {
          term: { pl: 'Redis', en: 'Redis' },
          def: {
            pl: 'Błyskawiczna baza klucz-wartość trzymana w pamięci RAM, dostępna dla wszystkich maszyn naraz. Standardowe miejsce na sesje, cache i liczniki, gdy aplikacja musi być bezstanowa - "wspólna lodówka" z tej lekcji.',
            en: 'A lightning-fast key-value store held in RAM, reachable by all machines at once. The standard home for sessions, caches and counters when the app must be stateless - the "shared fridge" of this lesson.'
          }
        },
        {
          term: { pl: 'p95 (percentyl 95)', en: 'p95 (95th percentile)' },
          def: {
            pl: 'Miara latencji: 95% żądań kończy się szybciej niż ta wartość. Uczciwsza niż średnia, bo widzi ogon powolnych żądań - dlatego cele wydajności i metryki skalowania ustawia się na percentylach, nie na średniej.',
            en: 'A latency measure: 95% of requests finish faster than this value. More honest than the average because it sees the tail of slow requests - which is why performance targets and scaling metrics use percentiles, not means.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="250" y="16" width="140" height="44" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="43" text-anchor="middle" font-size="15" fill="var(--text)">users</text>' +
          '<line x1="320" y1="60" x2="320" y2="92" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c2)"/>' +
          '<rect x="230" y="96" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="118" text-anchor="middle" font-size="15" fill="var(--text)">load balancer</text>' +
          '<text x="320" y="136" text-anchor="middle" font-size="12" fill="var(--muted)">public subnet, TLS</text>' +
          '<line x1="270" y1="144" x2="180" y2="188" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c2)"/>' +
          '<line x1="370" y1="144" x2="460" y2="188" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c2)"/>' +
          '<rect x="60" y="192" width="240" height="120" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="180" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">AZ-a (private subnet)</text>' +
          '<rect x="80" y="230" width="90" height="62" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="125" y="256" text-anchor="middle" font-size="13" fill="var(--text)">VM 1</text>' +
          '<text x="125" y="276" text-anchor="middle" font-size="12" fill="var(--muted)">app</text>' +
          '<rect x="190" y="230" width="90" height="62" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="235" y="256" text-anchor="middle" font-size="13" fill="var(--text)">VM 2</text>' +
          '<text x="235" y="276" text-anchor="middle" font-size="12" fill="var(--muted)">app</text>' +
          '<rect x="340" y="192" width="240" height="120" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="460" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">AZ-b (private subnet)</text>' +
          '<rect x="360" y="230" width="90" height="62" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="405" y="256" text-anchor="middle" font-size="13" fill="var(--text)">VM 3</text>' +
          '<text x="405" y="276" text-anchor="middle" font-size="12" fill="var(--muted)">app</text>' +
          '<rect x="470" y="230" width="90" height="62" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="515" y="256" text-anchor="middle" font-size="13" fill="var(--text)">VM 4</text>' +
          '<text x="515" y="276" text-anchor="middle" font-size="12" fill="var(--muted)">app</text>' +
          '<line x1="180" y1="312" x2="280" y2="356" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c2)"/>' +
          '<line x1="460" y1="312" x2="360" y2="356" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c2)"/>' +
          '<rect x="230" y="360" width="180" height="52" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="382" text-anchor="middle" font-size="14" fill="var(--text)">managed database</text>' +
          '<text x="320" y="402" text-anchor="middle" font-size="12" fill="var(--muted)">state lives here, not on VMs</text>' +
          '<text x="320" y="440" text-anchor="middle" font-size="13" fill="var(--muted)">stateless VMs in 2 AZs - any request can hit any machine</text>' +
          '</svg>',
        caption: {
          pl: 'Kanoniczny układ: load balancer w podsieci publicznej, bezstanowe VM-ki w dwóch strefach dostępności, stan w zarządzanej bazie.',
          en: 'The canonical layout: a load balancer in the public subnet, stateless VMs across two availability zones, state in a managed database.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Dzień z życia autoscalingu: ruch rośnie, maszyny dochodzą, jedna umiera, ruch spada - a użytkownicy niczego nie zauważają.',
            en: 'A day in the life of autoscaling: traffic climbs, machines join, one dies, traffic drops - and users notice nothing.'
          },
          frames: [
            {
              svg: asgFrame('100 req/s', 'var(--ok)',
                vmChip(100, 'VM 1', 'CPU 30%', 'var(--border)', 1) +
                vmChip(410, 'VM 2', 'CPU 30%', 'var(--border)', 1),
                asgArrow(165) + asgArrow(475),
                'Quiet morning: two instances, low CPU', 'The load balancer splits requests roughly evenly between healthy VMs.',
                'Minimum of the autoscaling group: 2 machines, for AZ redundancy.', 'var(--ok)'),
              label: { pl: '1. Spokojny ruch', en: '1. Calm traffic' },
              note: {
                pl: 'Dwie maszyny w dwóch strefach dostępności to rozsądne minimum: nie dla wydajności, tylko po to, żeby awaria jednej strefy nie zdjęła aplikacji.',
                en: 'Two machines in two availability zones is the sane minimum: not for performance, but so one zone failing does not take the app down.'
              }
            },
            {
              svg: asgFrame('900 req/s', 'var(--err)',
                vmChip(100, 'VM 1', 'CPU 95%', 'var(--err)', 1) +
                vmChip(410, 'VM 2', 'CPU 96%', 'var(--err)', 1),
                asgArrow(165) + asgArrow(475),
                'Spike: CPU way above the 70% target', 'The autoscaler compares the metric to its target and computes how many instances are missing.',
                'Users already feel it: p95 latency is climbing.', 'var(--err)'),
              label: { pl: '2. Skok ruchu', en: '2. The spike' },
              note: {
                pl: 'Autoscaling działa na metrykach, np. średnim CPU. Cel 70%, realnie 95% - automat wylicza, że przy tym ruchu potrzebne są cztery maszyny zamiast dwóch.',
                en: 'Autoscaling runs on metrics, e.g. average CPU. Target 70%, reality 95% - the automat computes that this traffic needs four machines, not two.'
              }
            },
            {
              svg: asgFrame('900 req/s', 'var(--warn)',
                vmChip(20, 'VM 1', 'CPU 52%', 'var(--border)', 1) +
                vmChip(175, 'VM 2', 'CPU 55%', 'var(--border)', 1) +
                vmChip(330, 'VM 3', 'booting...', 'var(--accent)', 1) +
                vmChip(485, 'VM 4', 'booting...', 'var(--accent)', 1),
                asgArrow(85) + asgArrow(240),
                'Scale out: two fresh VMs are booting', 'A new VM needs 1-2 minutes: boot the OS, start the app, pass health checks.',
                'Only then does the load balancer add it to the rotation.', 'var(--warn)'),
              label: { pl: '3. Dokładanie maszyn', en: '3. Scaling out' },
              note: {
                pl: 'Nowa maszyna nie pomaga od razu: system musi wstać, aplikacja wystartować, health checki przejść. Te 1-2 minuty rozgrzewki to główna słabość skalowania VM-kami - zapamiętaj ją, wróci przy serverless.',
                en: 'A new machine does not help instantly: the OS boots, the app starts, health checks must pass. That 1-2 minute warm-up is the key weakness of VM scaling - remember it, it returns in the serverless lesson.'
              }
            },
            {
              svg: asgFrame('900 req/s', 'var(--warn)',
                vmChip(20, 'VM 1', 'CPU 68%', 'var(--border)', 1) +
                vmChip(175, 'VM 2', 'health check fail', 'var(--err)', 0.6) +
                vmChip(330, 'VM 3', 'CPU 70%', 'var(--border)', 1) +
                vmChip(485, 'VM 4', 'CPU 69%', 'var(--border)', 1),
                asgArrow(85) + asgArrow(395) + asgArrow(550),
                'VM 2 stops answering health checks', 'The balancer cuts it from rotation after a few failed probes - no user request goes there.',
                'The autoscaler will terminate it and boot a replacement.', 'var(--err)'),
              label: { pl: '4. Awaria jednej maszyny', en: '4. One machine dies' },
              note: {
                pl: 'To jest cały sekret niezawodności chmury: nie "serwery, które nigdy nie padają", tylko automat, który pad wykrywa w sekundy, odcina ruch i stawia zastępstwo. Krowa, nie zwierzątko domowe.',
                en: 'This is the whole secret of cloud reliability: not "servers that never fail" but an automat that detects failure in seconds, cuts traffic and boots a replacement. Cattle, not pets.'
              }
            },
            {
              svg: asgFrame('150 req/s', 'var(--ok)',
                vmChip(100, 'VM 1', 'CPU 28%', 'var(--border)', 1) +
                vmChip(410, 'VM 4', 'CPU 30%', 'var(--border)', 1),
                asgArrow(165) + asgArrow(475),
                'Evening: scale in, back to two instances', 'Surplus VMs are drained (existing requests finish) and terminated.',
                'You stop paying for them the second they are gone.', 'var(--ok)'),
              label: { pl: '5. Zwijanie wieczorem', en: '5. Scaling in' },
              note: {
                pl: 'Zabieranie maszyn jest równie ważne jak dokładanie - to połowa rachunku. Instancja najpierw jest "drenowana" (kończy bieżące żądania), a dopiero potem gaszona.',
                en: 'Removing machines matters as much as adding them - it is half the bill. An instance is first drained (finishes in-flight requests) and only then terminated.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Prowadzisz pizzerię. W zwykły wtorek jeden piec spokojnie wystarcza. Ale w piątek, w wieczór meczowy, zamówienia lecą dziesięć razy szybciej. Co robisz? Możesz kupić jeden gigantyczny piec - drogi, a przez większość tygodnia i tak stoi zimny. Albo możesz dostawić na wieczór kilka zwykłych pieców i posadzić przy wejściu osobę, która rozdziela zamówienia: ten piec wolny, ten zajęty, ten się zepsuł, więc go pomijamy.</p>' +
            '<p>Chmura wybiera piece i rozdzielacza. Zamiast jednego wielkiego komputera wynajmujesz kilka zwykłych, a przed nimi stoi <strong>load balancer</strong> - bramkarz, który każde żądanie kieruje do najmniej zajętej maszyny i regularnie pyta każdą: "żyjesz?". Jak któraś nie odpowiada, przestaje do niej wysyłać gości.</p>' +
            '<p>Najlepsze jest to, że piece dostawiają się same. Automat patrzy, jak bardzo zajęte są maszyny: robi się gorąco - dostawia dwie kolejne; wieczór się kończy - odwozi nadmiarowe i przestajesz za nie płacić.</p>' +
            '<p>Jest jeden warunek, żeby ta sztuczka działała: każdy kucharz musi umieć obsłużyć każde zamówienie. Żaden nie może trzymać "swoich" klientów w notesie, którego inni nie widzą. Po informatycznemu: maszyny muszą być <strong>bezstanowe</strong> - wszystko ważne leży we wspólnej lodówce, nie w kieszeni kucharza.</p>',
          en: '<p>You run a pizzeria. On a regular Tuesday one oven is plenty. But on Friday, match night, orders come in ten times faster. What do you do? You could buy one gigantic oven - expensive, and cold most of the week. Or you could roll in a few ordinary ovens for the evening and put a person at the door who routes orders: this oven is free, this one is busy, this one broke so we skip it.</p>' +
            '<p>The cloud picks the ovens and the router. Instead of one huge computer you rent several ordinary ones, and in front of them stands a <strong>load balancer</strong> - a bouncer who sends every request to the least busy machine and keeps asking each one: "are you alive?". When one stops answering, it stops receiving guests.</p>' +
            '<p>The best part: the ovens add themselves. An automat watches how busy the machines are: things heat up - it rolls in two more; the evening winds down - it rolls the extras away and you stop paying for them.</p>' +
            '<p>There is one condition for the trick to work: every cook must be able to handle every order. Nobody may keep "their" customers in a private notebook others cannot see. In computer terms: the machines must be <strong>stateless</strong> - everything important lives in the shared fridge, not in a cook pocket.</p>'
        },
        school: {
          pl: '<p><strong>Maszyna wirtualna</strong> (VM) to udawany komputer wykrojony z prawdziwego serwera przez <strong>hypervisor</strong> - warstwę oprogramowania, która dzieli fizyczny sprzęt między wielu najemców i pilnuje izolacji między nimi. Wynajmując VM wybierasz rozmiar: liczbę <strong>vCPU</strong> (wirtualnych rdzeni procesora) i ilość RAM, np. 2 vCPU / 4 GB.</p>' +
            '<p>Gdy ruch rośnie, masz dwie drogi. <strong>Skalowanie wertykalne</strong> (w górę): wymieniasz maszynę na większą. Proste, ale ma sufit - największa maszyna świata ma swój koniec - i zwykle wymaga restartu. <strong>Skalowanie horyzontalne</strong> (wszerz): dostawiasz więcej identycznych maszyn. Nie ma sufitu, a przy okazji dostajesz odporność na awarie, bo padnięcie jednej z pięciu maszyn to problem, nie katastrofa. Chmura jest zbudowana pod skalowanie horyzontalne.</p>' +
            '<p>Żeby wiele maszyn wyglądało jak jedna aplikacja, przed nimi staje <strong>load balancer</strong>: jedno publiczne wejście, które rozdziela żądania i co kilka sekund robi <strong>health check</strong> (np. GET /health) każdej maszynie. Brak odpowiedzi kilka razy z rzędu oznacza wypadnięcie z rotacji - użytkownicy nawet nie zauważą, że jedna sztuka umarła. Dokładaniem i zabieraniem maszyn zarządza <strong>autoscaling</strong>: ustawiasz minimum (np. 2), maksimum (np. 10) i cel (np. średnie CPU 70%), a automat pilnuje reszty.</p>' +
            '<h4>Worked example: kampania marketingowa</h4>' +
            '<p>Twoja aplikacja obsługuje 200 żądań na sekundę na jednej maszynie. Marketing kupił spot i spodziewacie się szczytu 1000 żądań na sekundę. Rachunek: 1000 / 200 = 5 maszyn, plus jedna zapasowa na wypadek awarii w szczycie - autoscaling z maksimum 6 i minimum 2 załatwia sprawę. Bez chmury musiałbyś kupić 6 serwerów, które przez 360 dni w roku robiłyby nic.</p>' +
            '<h4>Warunek: bezstanowość</h4>' +
            '<p>Skalowanie horyzontalne działa tylko, gdy aplikacja jest <strong>stateless</strong>: żadnych sesji w pamięci procesu, żadnych plików użytkowników na lokalnym dysku. Kolejne żądanie tego samego użytkownika może trafić na inną maszynę, więc stan musi mieszkać we wspólnym miejscu: sesje w Redisie albo bazie, pliki w magazynie obiektów. To dokładnie ta sama zasada, przez którą w React nie trzymasz stanu aplikacji w losowym komponencie - stan mieszka tam, gdzie wszyscy go widzą.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Chmura skaluje wszerz: wiele małych, identycznych, bezstanowych maszyn za load balancerem, dokładanych i zabieranych automatycznie. Health check odcina chore maszyny, a stan aplikacji mieszka poza nimi. Jak coś w tym układzie nie działa, niemal zawsze złamana jest bezstanowość.</p>',
          en: '<p>A <strong>virtual machine</strong> (VM) is a pretend computer carved out of a real server by a <strong>hypervisor</strong> - a software layer that splits physical hardware among many tenants and enforces isolation between them. When renting a VM you pick a size: the number of <strong>vCPUs</strong> (virtual processor cores) and the RAM, e.g. 2 vCPU / 4 GB.</p>' +
            '<p>When traffic grows you have two roads. <strong>Vertical scaling</strong> (up): swap the machine for a bigger one. Simple, but it has a ceiling - the biggest machine in the world does end somewhere - and it usually needs a restart. <strong>Horizontal scaling</strong> (out): add more identical machines. No ceiling, and you get failure resilience as a bonus, because losing one machine out of five is a problem, not a catastrophe. The cloud is built for horizontal.</p>' +
            '<p>To make many machines look like one application, a <strong>load balancer</strong> stands in front: a single public entry point that spreads requests and runs a <strong>health check</strong> (e.g. GET /health) against every machine every few seconds. A few missed answers in a row means dropping out of rotation - users never notice that one unit died. Adding and removing machines is the job of <strong>autoscaling</strong>: you set a minimum (e.g. 2), a maximum (e.g. 10) and a target (e.g. average CPU 70%), and the automat handles the rest.</p>' +
            '<h4>Worked example: the marketing campaign</h4>' +
            '<p>Your app handles 200 requests per second on one machine. Marketing bought a TV spot and you expect a peak of 1000 requests per second. The math: 1000 / 200 = 5 machines, plus one spare in case something dies at peak - autoscaling with a maximum of 6 and a minimum of 2 covers it. Without the cloud you would buy 6 servers that do nothing 360 days a year.</p>' +
            '<h4>The precondition: statelessness</h4>' +
            '<p>Horizontal scaling only works when the app is <strong>stateless</strong>: no sessions in process memory, no user files on the local disk. The next request of the same user may land on a different machine, so state must live in a shared place: sessions in Redis or a database, files in object storage. It is the same principle that stops you from keeping app state in a random React component - state lives where everyone can see it.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>The cloud scales out: many small, identical, stateless machines behind a load balancer, added and removed automatically. Health checks cut off sick machines, and application state lives outside them. When this setup misbehaves, statelessness is almost always what got broken.</p>'
        },
        pro: {
          pl: '<p>Produkcyjny szkielet niemal każdej aplikacji w chmurze wygląda tak samo, więc warto go umieć narysować z pamięci. Wszystko mieszka w <strong>VPC</strong> (Virtual Private Cloud - twojej prywatnej sieci w chmurze), podzielonej na <strong>podsieci</strong>: publiczne, osiągalne z internetu, i prywatne, do których z zewnątrz nie ma wejścia. W publicznej stoi tylko load balancer; maszyny aplikacji i baza siedzą w prywatnych. Ruch między nimi filtrują <strong>security groups</strong> - firewalle per zasób: load balancer wpuszcza 443 ze świata, VM-ki wpuszczają ruch wyłącznie od load balancera, baza wyłącznie od VM-ek. Efekt: nawet jak ktoś zdobędzie adres bazy, z internetu jej nie dotknie.</p>' +
            '<p>Load balancer w wersji chmurowej (AWS ALB, GCP Load Balancing) działa na warstwie HTTP (<strong>L7</strong> - widzi ścieżki, nagłówki i cookies, umie kierować /api gdzie indziej niż /static) albo TCP (<strong>L4</strong> - szybszy, ślepy na treść). Tam też zwykle kończy się <strong>TLS</strong> (terminacja: certyfikat i szyfrowanie obsługuje balancer, do maszyn idzie ruch wewnętrzny). Dla ciebie jako frontendowca to znajome: to nginx z blokiem upstream, tylko zarządzany, skalowalny i z SLA (service level agreement - umowną gwarancją dostępności).</p>' +
            '<h4>Metryka autoscalingu to decyzja projektowa</h4>' +
            '<p>Automat skaluje na tym, co mu wskażesz - i tu jest klasyczna pułapka. CPU jest dobrym sygnałem dla obciążeń liczących (renderowanie, kompresja), ale aplikacja czekająca na zewnętrzne API - a tym właśnie jest backend wołający LLM - potrafi tonąć w żądaniach przy CPU 15%, bo czas schodzi na czekaniu, nie liczeniu. Wtedy skaluje się na liczbie żądań na instancję, głębokości kolejki albo latencji p95. Reguła: metryka musi rosnąć razem z bólem użytkownika, inaczej automat będzie ślepy na pożar.</p>' +
            '<h4>Liczby i pułapki</h4>' +
            '<ul>' +
            '<li>Boot świeżej VM-ki z aplikacją: 1-2 minuty. Autoscaling VM-ek nie ratuje przed skokiem, który trwa 30 sekund - na to odpowiedzią są kontenery i serverless (kolejne lekcje).</li>' +
            '<li>Load balancer kosztuje ~20-25 USD miesięcznie plus opłata za przetworzone GB - drobiazg przy dwóch maszynach po 30 USD.</li>' +
            '<li><strong>Sticky sessions</strong> (przypinanie użytkownika do jednej maszyny) to proteza na złamaną bezstanowość: psuje rozkład ruchu i umiera razem z maszyną. Lepiej przenieść sesje do Redisa.</li>' +
            '<li>Zarządzana baza (RDS, Cloud SQL) ma limit połączeń; 10 maszyn aplikacji z pulami po 20 połączeń to już 200 - przy skalowaniu wszerz pilnuj puli połączeń, nie tylko CPU.</li>' +
            '</ul>' +
            '<h4>Zwierzątka kontra bydło</h4>' +
            '<p>W żargonie: serwer-pieszczoch (pet) ma imię, ręczne poprawki i nikt nie pamięta, co na nim jest; bydło (cattle) to numerowane, identyczne maszyny stawiane z szablonu i ubijane bez żalu. Chmura wymusza podejście bydła: maszyna ma być odtwarzalna z definicji (obrazu, skryptu startowego), bo autoscaler będzie je tworzył i niszczył bez pytania. Jeśli cokolwiek trzeba "ręcznie doinstalować po starcie", autoscaling już nie działa.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Projektując backend pod LLM, od pierwszego dnia trzymaj stan poza procesem (Redis, baza, magazyn obiektów) - to warunek każdej dalszej lekcji tego modułu.</li>' +
            '<li>Wybieraj metrykę skalowania od bólu użytkownika (latencja, kolejka), nie od wygody (CPU).</li>' +
            '<li>Na rozmowie: umiej narysować VPC z podsieciami, załatwić "co się stanie, gdy padnie AZ" (nic - druga strefa przejmuje) i wyjaśnić, czemu sticky sessions to zapach, a nie rozwiązanie.</li>' +
            '</ul>',
          en: '<p>The production skeleton of almost every cloud application looks the same, so it pays to draw it from memory. Everything lives in a <strong>VPC</strong> (Virtual Private Cloud - your private network inside the cloud), split into <strong>subnets</strong>: public ones reachable from the internet and private ones with no way in from outside. Only the load balancer stands in the public subnet; app machines and the database sit in private ones. Traffic between them is filtered by <strong>security groups</strong> - per-resource firewalls: the balancer accepts 443 from the world, VMs accept traffic only from the balancer, the database only from the VMs. Result: even if someone learns the database address, they cannot touch it from the internet.</p>' +
            '<p>A cloud load balancer (AWS ALB, GCP Load Balancing) works at the HTTP layer (<strong>L7</strong> - it sees paths, headers and cookies and can route /api differently from /static) or at TCP (<strong>L4</strong> - faster, blind to content). It is also where <strong>TLS</strong> usually ends (termination: the balancer holds the certificate and does the encryption, machines get internal traffic). To a frontend dev this is familiar territory: it is nginx with an upstream block, just managed, scalable and with an SLA (service level agreement - a contractual availability guarantee).</p>' +
            '<h4>The autoscaling metric is a design decision</h4>' +
            '<p>The automat scales on whatever you point it at - and here sits a classic trap. CPU is a fine signal for compute-heavy loads (rendering, compression), but an app waiting on external APIs - which is exactly what a backend calling an LLM is - can drown in requests at 15% CPU, because time is spent waiting, not computing. Then you scale on requests per instance, queue depth or p95 latency instead. The rule: the metric must rise together with user pain, otherwise the automat is blind to the fire.</p>' +
            '<h4>Numbers and traps</h4>' +
            '<ul>' +
            '<li>Booting a fresh VM with your app: 1-2 minutes. VM autoscaling cannot save you from a 30-second spike - the answer to that is containers and serverless (next lessons).</li>' +
            '<li>A load balancer costs ~20-25 USD per month plus a fee per processed GB - a rounding error next to two 30 USD machines.</li>' +
            '<li><strong>Sticky sessions</strong> (pinning a user to one machine) are a crutch for broken statelessness: they skew traffic distribution and die with the machine. Move sessions to Redis instead.</li>' +
            '<li>A managed database (RDS, Cloud SQL) has a connection limit; 10 app machines with pools of 20 connections is already 200 - when scaling out, watch the connection pool, not just CPU.</li>' +
            '</ul>' +
            '<h4>Pets versus cattle</h4>' +
            '<p>In the jargon: a pet server has a name, hand-applied fixes and nobody remembers what is installed on it; cattle are numbered, identical machines built from a template and culled without regret. The cloud forces the cattle mindset: a machine must be reproducible from a definition (an image, a startup script), because the autoscaler will create and destroy them without asking. If anything needs to be "installed by hand after boot", autoscaling is already broken.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>When designing a backend for LLM calls, keep state out of the process from day one (Redis, database, object storage) - every later lesson of this module depends on it.</li>' +
            '<li>Pick the scaling metric from user pain (latency, queue depth), not from convenience (CPU).</li>' +
            '<li>In interviews: draw the VPC with subnets, answer "what happens when an AZ dies" (nothing - the other zone takes over) and explain why sticky sessions are a smell, not a solution.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co robi load balancer?',
            en: 'What does a load balancer do?'
          },
          options: [
            { pl: 'Kompresuje odpowiedzi serwera, żeby ważyły mniej', en: 'Compresses server responses so they weigh less' },
            { pl: 'Przyspiesza pojedynczą maszynę, dokładając jej mocy', en: 'Speeds up a single machine by giving it more power' },
            { pl: 'Stoi przed wieloma identycznymi maszynami, rozdziela między nie żądania i omija te, które nie odpowiadają na health checki', en: 'Stands in front of many identical machines, spreads requests between them and skips the ones failing health checks' },
            { pl: 'Robi kopie zapasowe bazy danych co godzinę', en: 'Backs up the database every hour' }
          ],
          correct: 2,
          explain: {
            pl: 'Load balancer to jedno publiczne wejście do stada maszyn: rozdziela ruch i wycina z rotacji chore instancje. Dzięki niemu wiele komputerów wygląda z zewnątrz jak jeden.',
            en: 'A load balancer is the single public door to a herd of machines: it spreads traffic and cuts sick instances from rotation. It makes many computers look like one from outside.'
          }
        },
        {
          q: {
            pl: 'Aplikacja przestaje wyrabiać z ruchem. Które podejście to skalowanie horyzontalne - i czemu chmura je preferuje?',
            en: 'Your app stops keeping up with traffic. Which approach is horizontal scaling - and why does the cloud prefer it?'
          },
          options: [
            { pl: 'Dostawienie kolejnych identycznych maszyn za load balancerem - bo nie ma sufitu i awaria jednej sztuki niczego nie zatrzymuje', en: 'Adding more identical machines behind a load balancer - because there is no ceiling and one unit dying stops nothing' },
            { pl: 'Wymiana maszyny na dwa razy większą - bo jedna duża maszyna jest zawsze tańsza', en: 'Swapping the machine for one twice as big - because one big machine is always cheaper' },
            { pl: 'Przepisanie aplikacji na szybszy język programowania', en: 'Rewriting the app in a faster programming language' },
            { pl: 'Włączenie kompresji gzip na serwerze', en: 'Enabling gzip compression on the server' }
          ],
          correct: 0,
          explain: {
            pl: 'Wertykalne skalowanie (większa maszyna) ma sufit i restart, a jedna maszyna to jeden punkt awarii. Horyzontalne rośnie praktycznie bez końca i przy okazji daje redundancję - dlatego cała chmura jest pod nie zaprojektowana.',
            en: 'Vertical scaling (a bigger machine) has a ceiling and a restart, and one machine is one point of failure. Horizontal grows nearly without limit and gives redundancy for free - the whole cloud is designed around it.'
          }
        },
        {
          q: {
            pl: 'Aplikacja trzyma sesje zalogowanych użytkowników w pamięci procesu. Włączacie autoscaling z load balancerem i użytkownicy zaczynają być losowo wylogowywani. Dlaczego?',
            en: 'The app keeps logged-in sessions in process memory. You enable autoscaling with a load balancer and users start getting randomly logged out. Why?'
          },
          options: [
            { pl: 'Load balancer kasuje ciasteczka przy każdym żądaniu', en: 'The load balancer deletes cookies on every request' },
            { pl: 'Autoscaling restartuje wszystkie maszyny co godzinę', en: 'Autoscaling restarts all machines every hour' },
            { pl: 'Health checki wymuszają ponowne logowanie', en: 'Health checks force users to log in again' },
            { pl: 'Kolejne żądania trafiają na inne maszyny, a sesja istnieje tylko w pamięci tej jednej, na której użytkownik się logował - aplikacja nie jest stateless', en: 'Subsequent requests land on different machines, and the session exists only in the memory of the one where the user logged in - the app is not stateless' }
          ],
          correct: 3,
          explain: {
            pl: 'Za load balancerem każde żądanie może trafić na dowolną maszynę. Sesja w pamięci jednej z nich jest niewidoczna dla reszty - stan musi mieszkać we wspólnym miejscu (Redis, baza), a nie w procesie.',
            en: 'Behind a load balancer any request may land on any machine. A session in the memory of one is invisible to the rest - state must live in a shared place (Redis, a database), not in the process.'
          }
        },
        {
          q: {
            pl: 'Backend woła zewnętrzne API modelu językowego i 90% czasu żądania to czekanie na odpowiedź (I/O), nie liczenie. Autoscaling ustawiono na średnie CPU 70%. W szczycie żądania się korkują, ale nowe maszyny nie dochodzą. Co jest grane?',
            en: 'A backend calls an external LLM API and 90% of each request is waiting for the response (I/O), not computing. Autoscaling targets average CPU at 70%. At peak, requests pile up but no new machines appear. What is going on?'
          },
          options: [
            { pl: 'Load balancer ma za mały limit przepustowości', en: 'The load balancer has too small a bandwidth limit' },
            { pl: 'Maszyny toną w czekających żądaniach przy niskim CPU, więc metryka nigdy nie przekracza celu - trzeba skalować po liczbie żądań, głębokości kolejki albo latencji p95', en: 'Machines drown in waiting requests at low CPU, so the metric never crosses the target - scale on requests per instance, queue depth or p95 latency instead' },
            { pl: 'Zewnętrzne API blokuje ruch z chmury', en: 'The external API blocks traffic from the cloud' },
            { pl: 'Autoscaling nie działa dla aplikacji korzystających z HTTPS', en: 'Autoscaling does not work for apps using HTTPS' }
          ],
          correct: 1,
          explain: {
            pl: 'Aplikacja I/O-bound czeka, a nie liczy, więc CPU stoi nisko mimo korka. Automat skaluje na metryce, którą mu wskazano - jeśli nie rośnie ona razem z bólem użytkownika, skalowanie nie zajdzie. To codzienny przypadek backendów wołających LLM-y.',
            en: 'An I/O-bound app waits instead of computing, so CPU stays low despite the jam. The automat scales on the metric it was given - if that metric does not rise with user pain, no scaling happens. This is the everyday case for backends calling LLMs.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'containers-docker',
      title: {
        pl: 'Kontenery i Docker',
        en: 'Containers and Docker'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'kontener', en: 'container' },
          def: {
            pl: 'Uruchomiony proces zapakowany razem ze wszystkim, czego potrzebuje (system plików, biblioteki, runtime), odizolowany od reszty maszyny, ale współdzielący jej jądro systemu. Startuje w ułamku sekundy.',
            en: 'A running process packed together with everything it needs (filesystem, libraries, runtime), isolated from the rest of the machine but sharing its OS kernel. Starts in a fraction of a second.'
          }
        },
        {
          term: { pl: 'obraz (image)', en: 'image' },
          def: {
            pl: 'Zamrożony, niezmienny szablon kontenera: system plików plus metadane. Relacja obraz-kontener jest jak klasa-instancja albo paczka npm-uruchomiony proces: z jednego obrazu startujesz dowolnie wiele kontenerów.',
            en: 'A frozen, immutable template for containers: a filesystem plus metadata. The image-container relation is class-instance, or npm package-running process: one image can start any number of containers.'
          }
        },
        {
          term: { pl: 'Dockerfile', en: 'Dockerfile' },
          def: {
            pl: 'Przepis na obraz: lista instrukcji (FROM, COPY, RUN, CMD) wykonywanych po kolei przy budowaniu. Każda instrukcja dokłada jedną warstwę do obrazu.',
            en: 'The recipe for an image: a list of instructions (FROM, COPY, RUN, CMD) executed in order at build time. Each instruction adds one layer to the image.'
          }
        },
        {
          term: { pl: 'warstwa (layer)', en: 'layer' },
          def: {
            pl: 'Niezmienny plaster systemu plików dodany przez jedną instrukcję Dockerfile. Warstwy są cache-owane: jeśli instrukcja i jej wejście się nie zmieniły, build używa gotowej warstwy zamiast liczyć ją od nowa - stąd kolejność instrukcji ma ogromne znaczenie.',
            en: 'An immutable slice of the filesystem added by one Dockerfile instruction. Layers are cached: if the instruction and its input did not change, the build reuses the ready layer instead of recomputing it - which is why instruction order matters enormously.'
          }
        },
        {
          term: { pl: 'rejestr (registry)', en: 'registry' },
          def: {
            pl: 'Magazyn obrazów, z którego się je wypycha (push) i ściąga (pull): Docker Hub, GitHub Container Registry, AWS ECR. Dokładny odpowiednik rejestru npm, tylko dla obrazów kontenerów.',
            en: 'A store you push images to and pull them from: Docker Hub, GitHub Container Registry, AWS ECR. The exact counterpart of the npm registry, but for container images.'
          }
        },
        {
          term: { pl: 'tag', en: 'tag' },
          def: {
            pl: 'Etykieta wersji obrazu, np. myapp:1.4.2 albo node:20-slim. Tag latest to ruchomy wskaźnik, nie wersja - w produkcji przypina się konkretny tag albo digest (sumę kontrolną), dokładnie jak lockfile przypina wersje paczek.',
            en: 'A version label on an image, e.g. myapp:1.4.2 or node:20-slim. The latest tag is a moving pointer, not a version - production pins a concrete tag or a digest (checksum), exactly like a lockfile pins package versions.'
          }
        },
        {
          term: { pl: 'multi-stage build', en: 'multi-stage build' },
          def: {
            pl: 'Dockerfile z kilkoma etapami: pierwszy ma pełne środowisko budowania (kompilator, devDependencies), a do finalnego obrazu kopiuje się wyłącznie artefakty. Obraz produkcyjny chudnie z gigabajta do stu-dwustu megabajtów.',
            en: 'A Dockerfile with several stages: the first has the full build environment (compiler, devDependencies) and only artifacts get copied into the final image. The production image shrinks from a gigabyte to one or two hundred megabytes.'
          }
        },
        {
          term: { pl: 'jądro systemu (kernel)', en: 'kernel' },
          def: {
            pl: 'Rdzeń systemu operacyjnego rozmawiający ze sprzętem. Kontenery współdzielą jądro maszyny-gospodarza (dlatego startują w milisekundy i ważą mało), podczas gdy każda VM wozi własny cały system - to jest sedno różnicy kontener vs VM.',
            en: 'The core of the OS that talks to hardware. Containers share the host kernel (hence millisecond starts and low weight), while each VM carries a whole OS of its own - that is the heart of the container vs VM difference.'
          }
        },
        {
          term: { pl: 'wolumen (volume)', en: 'volume' },
          def: {
            pl: 'Dysk podpinany do kontenera z zewnątrz. System plików kontenera znika razem z nim, więc wszystko, co ma przeżyć restart (dane bazy, uploady), musi mieszkać na wolumenie albo poza kontenerem.',
            en: 'A disk attached to a container from outside. A container filesystem disappears with the container, so anything meant to survive a restart (database data, uploads) must live on a volume or outside the container.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="40" width="150" height="90" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="95" y="70" text-anchor="middle" font-size="15" fill="var(--text)">Dockerfile</text>' +
          '<text x="95" y="92" text-anchor="middle" font-size="12" fill="var(--muted)">FROM, COPY,</text>' +
          '<text x="95" y="110" text-anchor="middle" font-size="12" fill="var(--muted)">RUN, CMD</text>' +
          '<line x1="170" y1="85" x2="230" y2="85" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c3)"/>' +
          '<text x="200" y="72" text-anchor="middle" font-size="12" fill="var(--muted)">build</text>' +
          '<rect x="235" y="30" width="170" height="110" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="54" text-anchor="middle" font-size="15" fill="var(--text)">image myapp:1.0</text>' +
          '<rect x="255" y="66" width="130" height="18" rx="4" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="320" y="79" text-anchor="middle" font-size="11" fill="var(--text)">base: node:20-slim</text>' +
          '<rect x="255" y="88" width="130" height="18" rx="4" fill="var(--accent2)" opacity="0.6"/>' +
          '<text x="320" y="101" text-anchor="middle" font-size="11" fill="var(--text)">node_modules</text>' +
          '<rect x="255" y="110" width="130" height="18" rx="4" fill="var(--accent)" opacity="0.7"/>' +
          '<text x="320" y="123" text-anchor="middle" font-size="11" fill="var(--text)">your code</text>' +
          '<line x1="405" y1="85" x2="465" y2="85" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c3)"/>' +
          '<text x="435" y="72" text-anchor="middle" font-size="12" fill="var(--muted)">push</text>' +
          '<rect x="470" y="40" width="150" height="90" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="545" y="80" text-anchor="middle" font-size="15" fill="var(--text)">registry</text>' +
          '<text x="545" y="102" text-anchor="middle" font-size="12" fill="var(--muted)">ECR / GHCR / Hub</text>' +
          '<line x1="545" y1="130" x2="545" y2="180" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c3)"/>' +
          '<line x1="470" y1="120" x2="120" y2="185" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c3)"/>' +
          '<line x1="500" y1="128" x2="330" y2="185" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c3)"/>' +
          '<text x="300" y="168" text-anchor="middle" font-size="12" fill="var(--muted)">pull - identical bytes everywhere</text>' +
          '<rect x="40" y="190" width="160" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="120" y="220" text-anchor="middle" font-size="14" fill="var(--text)">your laptop</text>' +
          '<text x="120" y="244" text-anchor="middle" font-size="12" fill="var(--muted)">docker run myapp</text>' +
          '<rect x="250" y="190" width="160" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="330" y="220" text-anchor="middle" font-size="14" fill="var(--text)">CI runner</text>' +
          '<text x="330" y="244" text-anchor="middle" font-size="12" fill="var(--muted)">tests in container</text>' +
          '<rect x="460" y="190" width="160" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="540" y="220" text-anchor="middle" font-size="14" fill="var(--text)">cloud</text>' +
          '<text x="540" y="244" text-anchor="middle" font-size="12" fill="var(--muted)">K8s / Cloud Run</text>' +
          '<rect x="20" y="300" width="600" height="96" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="332" text-anchor="middle" font-size="15" fill="var(--text)">One artifact from laptop to production</text>' +
          '<text x="320" y="358" text-anchor="middle" font-size="13" fill="var(--muted)">the image carries app + runtime + libraries, so "works on my machine"</text>' +
          '<text x="320" y="380" text-anchor="middle" font-size="13" fill="var(--muted)">finally means "works everywhere"</text>' +
          '</svg>',
        caption: {
          pl: 'Cykl życia obrazu: Dockerfile buduje obraz z warstw, obraz idzie do rejestru, a stamtąd te same bajty uruchamiają się na laptopie, w CI i w chmurze.',
          en: 'The image life cycle: a Dockerfile builds a layered image, the image goes to a registry, and from there the same bytes run on a laptop, in CI and in the cloud.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Budowanie obrazu warstwa po warstwie - i dlaczego kolejność instrukcji w Dockerfile decyduje, czy rebuild trwa 4 sekundy czy 4 minuty.',
            en: 'Building an image layer by layer - and why instruction order in a Dockerfile decides whether a rebuild takes 4 seconds or 4 minutes.'
          },
          frames: [
            {
              svg: dkFrame(
                dkLine(1, 'FROM node:20-slim', 'var(--accent)') +
                dkLine(2, 'COPY package*.json .', 'var(--muted)') +
                dkLine(3, 'RUN npm ci', 'var(--muted)') +
                dkLine(4, 'COPY src ./src', 'var(--muted)') +
                dkLine(5, 'CMD [node, src/index.js]', 'var(--muted)'),
                dkLayer(0, 'node:20-slim', 'var(--accent2)', 0.45, ''),
                'FROM: start from a base image', 'The base is itself a stack of layers, pulled from a public registry.',
                'It brings the OS userland and the Node runtime.', 'var(--accent)'),
              label: { pl: '1. Baza', en: '1. The base' },
              note: {
                pl: 'FROM ściąga gotowy obraz bazowy - tu okrojony Linux z zainstalowanym Node. Nie budujesz świata od zera, dziedziczysz go jak klasę.',
                en: 'FROM pulls a ready base image - here a trimmed Linux with Node installed. You do not build the world from scratch, you inherit it like a class.'
              }
            },
            {
              svg: dkFrame(
                dkLine(1, 'FROM node:20-slim', 'var(--muted)') +
                dkLine(2, 'COPY package*.json .', 'var(--accent)') +
                dkLine(3, 'RUN npm ci', 'var(--accent)') +
                dkLine(4, 'COPY src ./src', 'var(--muted)') +
                dkLine(5, 'CMD [node, src/index.js]', 'var(--muted)'),
                dkLayer(0, 'node:20-slim', 'var(--accent2)', 0.45, '') +
                dkLayer(1, 'package.json', 'var(--accent2)', 0.6, '') +
                dkLayer(2, 'node_modules (npm ci)', 'var(--accent2)', 0.75, ''),
                'Dependencies become their own layers', 'COPY package.json first, then npm ci - deliberately BEFORE the source code.',
                'This ordering is the whole trick, visible in two frames.', 'var(--accent)'),
              label: { pl: '2. Zależności', en: '2. Dependencies' },
              note: {
                pl: 'Każda instrukcja to jedna warstwa. Manifest paczek i npm ci idą przed kodem źródłowym - za dwie klatki zobaczysz, po co ta kolejność.',
                en: 'Each instruction is one layer. The package manifest and npm ci go before the source code - two frames from now you will see why.'
              }
            },
            {
              svg: dkFrame(
                dkLine(1, 'FROM node:20-slim', 'var(--muted)') +
                dkLine(2, 'COPY package*.json .', 'var(--muted)') +
                dkLine(3, 'RUN npm ci', 'var(--muted)') +
                dkLine(4, 'COPY src ./src', 'var(--accent)') +
                dkLine(5, 'CMD [node, src/index.js]', 'var(--accent)'),
                dkLayer(0, 'node:20-slim', 'var(--accent2)', 0.45, '') +
                dkLayer(1, 'package.json', 'var(--accent2)', 0.6, '') +
                dkLayer(2, 'node_modules (npm ci)', 'var(--accent2)', 0.75, '') +
                dkLayer(3, 'src + CMD', 'var(--accent)', 0.8, ''),
                'Image complete: tag it and push it', 'docker build -t myapp:1.0 . then docker push - the registry stores the layers.',
                'The image is immutable: same bytes on every machine that pulls it.', 'var(--ok)'),
              label: { pl: '3. Gotowy obraz', en: '3. The finished image' },
              note: {
                pl: 'Kod ląduje na samej górze stosu. Obraz z tagiem myapp:1.0 jest niezmienny - wypchnięty do rejestru będzie wszędzie dokładnie taki sam, co do bajta.',
                en: 'The code lands at the very top of the stack. Tagged myapp:1.0, the image is immutable - pushed to a registry it is byte-for-byte identical everywhere.'
              }
            },
            {
              svg: dkFrame(
                dkLine(1, 'FROM node:20-slim', 'var(--muted)') +
                dkLine(2, 'COPY package*.json .', 'var(--muted)') +
                dkLine(3, 'RUN npm ci', 'var(--muted)') +
                dkLine(4, 'COPY src ./src', 'var(--warn)') +
                dkLine(5, 'CMD [node, src/index.js]', 'var(--muted)'),
                dkLayer(0, 'node:20-slim', 'var(--accent2)', 0.45, 'cache') +
                dkLayer(1, 'package.json', 'var(--accent2)', 0.6, 'cache') +
                dkLayer(2, 'node_modules (npm ci)', 'var(--accent2)', 0.75, 'cache') +
                dkLayer(3, 'src + CMD (rebuilt)', 'var(--warn)', 0.85, ''),
                'You edited one file in src - rebuild', 'Layers below the change are reused from cache; only the top layer is rebuilt.',
                'Rebuild: ~4 seconds instead of a full npm ci. Order = money.', 'var(--warn)'),
              label: { pl: '4. Rebuild z cache', en: '4. Rebuild with cache' },
              note: {
                pl: 'Zmienił się tylko kod, więc warstwy bazy i node_modules idą z cache, a przebudowuje się jedynie wierzchnia. Gdyby COPY src było przed npm ci, każda zmiana kodu przebudowywałaby też zależności. Ta sama logika co cache w CI.',
                en: 'Only the code changed, so the base and node_modules layers come from cache and only the top one rebuilds. With COPY src before npm ci, every code change would rebuild dependencies too. Same logic as CI caching.'
              }
            },
            {
              svg: svgFrame(
                fHead('docker run: one image, many containers') +
                fBox(240, 46, 160, 64, 'myapp:1.0', 'immutable image', 'var(--accent)') +
                fArrowD(320, 114, 30, 'var(--accent)') +
                fChip(60, 160, 150, 'container: laptop', 'var(--surface)', 'var(--ok)') +
                fChip(245, 160, 150, 'container: CI', 'var(--surface)', 'var(--ok)') +
                fChip(430, 160, 150, 'container: cloud', 'var(--surface)', 'var(--ok)') +
                fText(320, 234, 'each starts in ~100 ms, isolated, sharing the host kernel', 13, 'var(--muted)', 'middle') +
                fPanel('Image is the class, containers are instances', 'The same artifact runs identically on every machine with a container runtime.',
                  '"Works on my machine" stops being an argument - it IS the same machine.', 'var(--ok)')
              ),
              label: { pl: '5. Uruchomienie', en: '5. Running it' },
              note: {
                pl: 'Z jednego obrazu startuje dowolna liczba kontenerów - na laptopie, w CI i w chmurze identycznych. To jest artefakt wdrożeniowy nowoczesnej chmury: nie "kod", tylko obraz.',
                en: 'One image starts any number of containers - identical on a laptop, in CI and in the cloud. This is the deployment artifact of the modern cloud: not "code", the image.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Zanim wymyślono kontenery transportowe, załadunek statku był koszmarem: worki, beczki, skrzynie, każda innego kształtu, każda pakowana ręcznie. Potem ktoś powiedział: pakujmy WSZYSTKO do identycznych stalowych pudeł. Nieważne, co jest w środku - banany czy telewizory - każde pudło pasuje na każdy statek, dźwig i tir na świecie.</p>' +
            '<p>W informatyce ten sam wynalazek nazywa się <strong>kontenerem</strong>. Do pudła pakujesz aplikację razem ze wszystkim, czego potrzebuje: bibliotekami, ustawieniami, właściwą wersją Node. Zamknięte pudło nazywa się <strong>obrazem</strong> i jest zamrożone: nikt nie dosypie do środka niczego po drodze.</p>' +
            '<p>Po co to? Znasz to zdanie: <em>u mnie działa</em>. U ciebie działa, bo masz Node 20, a na serwerze jest 16. U ciebie jest ta biblioteka, tam jej nie ma. Kontener kończy tę kłótnię raz na zawsze: skoro aplikacja jedzie w pudle razem ze swoim całym światem, to działa tak samo na twoim laptopie, u kolegi i na serwerze w Irlandii. Dosłownie te same bajty.</p>' +
            '<p>A czemu nie wsadzić każdej aplikacji do osobnej maszyny wirtualnej? Bo maszyna wirtualna to cały dom przewożony dla jednej kanapy: swój system, swoje wszystko, minuty rozruchu. Kontener to samo pudło - lekkie i otwierane w ułamku sekundy.</p>',
          en: '<p>Before shipping containers were invented, loading a ship was a nightmare: sacks, barrels, crates, every shape different, everything packed by hand. Then someone said: let us pack EVERYTHING into identical steel boxes. No matter what is inside - bananas or televisions - every box fits every ship, crane and truck in the world.</p>' +
            '<p>In computing the same invention is called a <strong>container</strong>. Into the box goes your application together with everything it needs: libraries, settings, the right version of Node. The sealed box is called an <strong>image</strong> and it is frozen: nobody can slip anything inside along the way.</p>' +
            '<p>Why bother? You know the sentence: <em>works on my machine</em>. It works for you because you have Node 20 and the server has 16. You have that one library, the server does not. The container ends this argument once and for all: since the app travels in a box with its whole world, it runs the same on your laptop, at a colleague and on a server in Ireland. Literally the same bytes.</p>' +
            '<p>And why not put every app in its own virtual machine? Because a VM is an entire house shipped to move one sofa: its own OS, its own everything, minutes to start. A container is just the box - light, and opened in a fraction of a second.</p>'
        },
        school: {
          pl: '<p><strong>Kontener</strong> to proces uruchomiony w izolacji: ma własny system plików, własne zmienne środowiskowe i nie widzi reszty maszyny, ale - i to kluczowe - współdzieli z nią <strong>jądro systemu</strong> (kernel, rdzeń systemu operacyjnego rozmawiający ze sprzętem). Maszyna wirtualna wozi cały własny system operacyjny i startuje minutami; kontener pożycza jądro gospodarza i startuje w ~100 milisekund, ważąc megabajty zamiast gigabajtów.</p>' +
            '<p>Świat kontenerów ma trzy rzeczowniki, które musisz rozróżniać bezbłędnie:</p>' +
            '<ul>' +
            '<li><strong>Dockerfile</strong> - przepis: lista instrukcji budowania.</li>' +
            '<li><strong>Obraz</strong> (image) - zamrożony wynik przepisu: szablon, z którego startuje się kontenery. Jak klasa albo paczka npm.</li>' +
            '<li><strong>Kontener</strong> - działająca instancja obrazu. Jak obiekt klasy albo uruchomiony proces.</li>' +
            '</ul>' +
            '<p>Typowy Dockerfile aplikacji Node wygląda tak:</p>' +
            '<pre><code>FROM node:20-slim\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY src ./src\nCMD ["node", "src/index.js"]</code></pre>' +
            '<p>Budujesz go poleceniem <code>docker build -t myapp:1.0 .</code>, uruchamiasz przez <code>docker run -p 3000:3000 myapp:1.0</code>, a wypychasz do <strong>rejestru</strong> (registry - magazynu obrazów, odpowiednika rejestru npm) przez <code>docker push</code>. Z rejestru ten sam obraz ściąga CI, kolega z zespołu i serwer produkcyjny.</p>' +
            '<h4>Warstwy i cache - skąd ta dziwna kolejność</h4>' +
            '<p>Każda instrukcja Dockerfile dokłada <strong>warstwę</strong> - niezmienny plaster systemu plików. Warstwy są cache-owane: jeśli instrukcja i jej wejście się nie zmieniły, build bierze gotową warstwę z dysku. Dlatego <code>COPY package*.json</code> i <code>RUN npm ci</code> stoją PRZED <code>COPY src</code>: kod zmieniasz sto razy dziennie, zależności raz w tygodniu. Przy tej kolejności zmiana kodu przebudowuje tylko wierzchnią warstwę (sekundy), a nie npm ci od zera (minuty). To dokładnie ta sama logika, co cache node_modules w CI.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Obraz to zamrożona paczka "aplikacja + jej świat", kontener to jej działająca instancja, rejestr to npm dla obrazów. Kontener jest lekki, bo współdzieli jądro z gospodarzem. A kolejność instrukcji w Dockerfile układa się od najrzadziej do najczęściej zmienianych rzeczy, bo tak działa cache warstw.</p>',
          en: '<p>A <strong>container</strong> is a process running in isolation: it has its own filesystem and environment variables and cannot see the rest of the machine, but - crucially - it shares the host <strong>kernel</strong> (the core of the OS that talks to hardware). A virtual machine carries an entire OS of its own and takes minutes to start; a container borrows the host kernel and starts in ~100 milliseconds, weighing megabytes instead of gigabytes.</p>' +
            '<p>The container world has three nouns you must never confuse:</p>' +
            '<ul>' +
            '<li><strong>Dockerfile</strong> - the recipe: a list of build instructions.</li>' +
            '<li><strong>Image</strong> - the frozen result of the recipe: the template containers start from. Like a class, or an npm package.</li>' +
            '<li><strong>Container</strong> - a running instance of an image. Like an object of a class, or a running process.</li>' +
            '</ul>' +
            '<p>A typical Dockerfile for a Node app:</p>' +
            '<pre><code>FROM node:20-slim\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY src ./src\nCMD ["node", "src/index.js"]</code></pre>' +
            '<p>You build it with <code>docker build -t myapp:1.0 .</code>, run it with <code>docker run -p 3000:3000 myapp:1.0</code> and push it to a <strong>registry</strong> (an image store, the counterpart of the npm registry) with <code>docker push</code>. From the registry the same image is pulled by CI, by a teammate and by the production server.</p>' +
            '<h4>Layers and cache - the reason for the odd ordering</h4>' +
            '<p>Every Dockerfile instruction adds a <strong>layer</strong> - an immutable slice of the filesystem. Layers are cached: if an instruction and its input did not change, the build reuses the stored layer. That is why <code>COPY package*.json</code> and <code>RUN npm ci</code> come BEFORE <code>COPY src</code>: you change code a hundred times a day and dependencies once a week. With this order a code change rebuilds only the top layer (seconds) instead of rerunning npm ci from scratch (minutes). It is exactly the node_modules caching logic from CI.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>An image is a frozen package of "the app plus its world", a container is its running instance, a registry is npm for images. Containers are light because they share the host kernel. And Dockerfile instructions are ordered from least to most frequently changing, because that is how layer caching works.</p>'
        },
        pro: {
          pl: '<p>W produkcji obraz kontenera jest <strong>artefaktem wdrożeniowym</strong>: to jego wersjonujesz, testujesz i wdrażasz, nie "kod". Ten sam obraz, który przeszedł testy w CI, co do bajta idzie na produkcję - to zamyka całą klasę błędów typu "na stagingu było inne środowisko". Kilka praktyk decyduje o tym, czy ten artefakt jest dobry.</p>' +
            '<h4>Multi-stage build: obraz produkcyjny bez narzędzi budowania</h4>' +
            '<pre><code>FROM node:20 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build   # tsc, bundling\n\nFROM node:20-slim\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/dist ./dist\nCOPY package*.json ./\nRUN npm ci --omit=dev\nUSER node\nCMD ["node", "dist/index.js"]</code></pre>' +
            '<p>Etap pierwszy ma kompilator TypeScript i devDependencies; do finalnego obrazu kopiują się wyłącznie zbudowane artefakty. Efekt w liczbach: pełny <code>node:20</code> to ~1 GB, <code>node:20-slim</code> z samym dist ~150-250 MB. Mniejszy obraz to szybszy pull, szybszy start przy skalowaniu i mniejsza powierzchnia ataku. Dyrektywa <code>USER node</code> zdejmuje uprawnienia roota - kontener z rootem to klasyczne znalezisko audytu bezpieczeństwa.</p>' +
            '<h4>Tagi, konfiguracja, stan</h4>' +
            '<ul>' +
            '<li><strong>Nigdy :latest w produkcji.</strong> To ruchomy wskaźnik: dziś i jutro może oznaczać inne bajty, więc rollback i debugowanie tracą sens. Przypinasz wersję (myapp:1.4.2) albo digest, jak lockfile przypina paczki.</li>' +
            '<li><strong>Konfiguracja przez zmienne środowiskowe</strong>, nie wpieczona w obraz: jeden obraz, wiele środowisk (dev, staging, prod). Sekrety wstrzykuje platforma, w obrazie nie ma prawa być żadnego klucza API.</li>' +
            '<li><strong>System plików kontenera jest jednorazowy</strong> - znika z kontenerem. Wszystko trwałe idzie na <strong>wolumen</strong> albo do usług zewnętrznych (baza, magazyn obiektów). Kontener ma być bydłem, nie pieszczochem - dokładnie jak VM-ki z poprzedniej lekcji.</li>' +
            '</ul>' +
            '<h4>Lokalne środowisko: Docker Compose</h4>' +
            '<p><strong>Docker Compose</strong> opisuje wielousługowy stack w jednym pliku YAML: aplikacja + Postgres + Redis + Qdrant startują jednym <code>docker compose up</code>. Dla inżyniera AI to standardowy sposób na lokalny stack RAG (baza wektorowa obok aplikacji) bez instalowania czegokolwiek na maszynie. Nowa osoba w zespole dostaje działające środowisko w kwadrans - to jest argument, który sprzedaje kontenery biznesowi.</p>' +
            '<h4>Drobiazgi, które bolą dopiero w praktyce</h4>' +
            '<ul>' +
            '<li>Docker na Macu działa w ukrytej maszynie wirtualnej z Linuksem - stąd wolniejsze I/O i inne ścieżki niż na produkcji. Buduj obrazy pod architekturę serwera (<code>--platform linux/amd64</code> przy Macach z ARM), inaczej obraz z M-procesora nie wstanie na klasycznym klastrze.</li>' +
            '<li>Plik <code>.dockerignore</code> (odpowiednik .gitignore) musi wykluczać node_modules i .git, inaczej kontekst builda puchnie i cache przestaje trafiać.</li>' +
            '<li>Skanery obrazów (Trivy, Docker Scout) wyłapują znane podatności w warstwach bazowych - w poważnych firmach to bramka w CI.</li>' +
            '</ul>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Traktuj obraz jak jedyny artefakt: build raz w CI, ten sam obraz przez staging do produkcji, wersjonowany jak paczka.</li>' +
            '<li>Kolejność warstw i multi-stage to nie kosmetyka - to różnica między 4-sekundowym a 4-minutowym buildem i między 150 MB a 1 GB obrazu.</li>' +
            '<li>Na rozmowie: umiej wyjaśnić obraz vs kontener, czemu kontener startuje w milisekundy (współdzielone jądro) i czemu :latest w produkcji to czerwona flaga.</li>' +
            '</ul>',
          en: '<p>In production the container image is the <strong>deployment artifact</strong>: it is what you version, test and deploy - not "the code". The exact image that passed CI goes byte-for-byte to production, which closes the entire class of "staging had a different environment" bugs. A few practices decide whether that artifact is a good one.</p>' +
            '<h4>Multi-stage build: a production image without build tools</h4>' +
            '<pre><code>FROM node:20 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build   # tsc, bundling\n\nFROM node:20-slim\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/dist ./dist\nCOPY package*.json ./\nRUN npm ci --omit=dev\nUSER node\nCMD ["node", "dist/index.js"]</code></pre>' +
            '<p>The first stage holds the TypeScript compiler and devDependencies; only built artifacts get copied into the final image. In numbers: full <code>node:20</code> is ~1 GB, <code>node:20-slim</code> with just dist is ~150-250 MB. A smaller image pulls faster, starts faster when scaling and offers less attack surface. The <code>USER node</code> directive drops root privileges - a root container is the classic security-audit finding.</p>' +
            '<h4>Tags, configuration, state</h4>' +
            '<ul>' +
            '<li><strong>Never :latest in production.</strong> It is a moving pointer: today and tomorrow it may mean different bytes, so rollback and debugging stop making sense. Pin a version (myapp:1.4.2) or a digest, like a lockfile pins packages.</li>' +
            '<li><strong>Configuration through environment variables</strong>, not baked into the image: one image, many environments (dev, staging, prod). Secrets are injected by the platform; no API key has any right to exist inside an image.</li>' +
            '<li><strong>The container filesystem is disposable</strong> - it vanishes with the container. Anything durable goes to a <strong>volume</strong> or to external services (database, object storage). Containers are cattle, not pets - exactly like the VMs of the previous lesson.</li>' +
            '</ul>' +
            '<h4>Local environments: Docker Compose</h4>' +
            '<p><strong>Docker Compose</strong> describes a multi-service stack in one YAML file: app + Postgres + Redis + Qdrant start with a single <code>docker compose up</code>. For an AI engineer this is the standard way to run a local RAG stack (a vector database next to the app) without installing anything on the machine. A new team member gets a working environment in fifteen minutes - the argument that sells containers to the business.</p>' +
            '<h4>Details that only hurt in practice</h4>' +
            '<ul>' +
            '<li>Docker on a Mac runs inside a hidden Linux VM - hence slower I/O and paths that differ from production. Build for the server architecture (<code>--platform linux/amd64</code> on ARM Macs), or an image built on an M-series chip will not start on a classic cluster.</li>' +
            '<li>The <code>.dockerignore</code> file (the .gitignore counterpart) must exclude node_modules and .git, or the build context balloons and the cache stops hitting.</li>' +
            '<li>Image scanners (Trivy, Docker Scout) catch known vulnerabilities in base layers - in serious companies that is a CI gate.</li>' +
            '</ul>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Treat the image as the single artifact: built once in CI, promoted unchanged through staging to production, versioned like a package.</li>' +
            '<li>Layer order and multi-stage are not cosmetics - they are the difference between a 4-second and a 4-minute build, and between 150 MB and 1 GB.</li>' +
            '<li>In interviews: explain image vs container, why containers start in milliseconds (shared kernel) and why :latest in production is a red flag.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaki problem rozwiązują kontenery?',
            en: 'What problem do containers solve?'
          },
          options: [
            { pl: 'Słynne "u mnie działa": aplikacja jedzie w paczce razem ze swoim środowiskiem, więc działa identycznie na każdej maszynie', en: 'The famous "works on my machine": the app travels packaged with its environment, so it runs identically on every machine' },
            { pl: 'Sprawiają, że kod wykonuje się szybciej niż poza kontenerem', en: 'They make code execute faster than outside a container' },
            { pl: 'Zastępują system kontroli wersji', en: 'They replace version control' },
            { pl: 'Automatycznie naprawiają błędy w zależnościach', en: 'They automatically fix bugs in dependencies' }
          ],
          correct: 0,
          explain: {
            pl: 'Kontener pakuje aplikację razem z bibliotekami, runtime i konfiguracją w jeden przenośny artefakt. Te same bajty działają na laptopie, w CI i na produkcji - spory o środowisko znikają.',
            en: 'A container packs the app with its libraries, runtime and configuration into one portable artifact. The same bytes run on a laptop, in CI and in production - environment arguments disappear.'
          }
        },
        {
          q: {
            pl: 'Czym różni się obraz (image) od kontenera?',
            en: 'What is the difference between an image and a container?'
          },
          options: [
            { pl: 'Obraz jest dla Linuksa, kontener dla Windows', en: 'Images are for Linux, containers for Windows' },
            { pl: 'To dwa słowa na to samo', en: 'Two words for the same thing' },
            { pl: 'Kontener jest szablonem, z którego buduje się obrazy', en: 'A container is the template images are built from' },
            { pl: 'Obraz to zamrożony szablon, kontener to jego działająca instancja - jak klasa i obiekt albo paczka npm i uruchomiony proces', en: 'An image is a frozen template and a container is its running instance - like class and object, or an npm package and a running process' }
          ],
          correct: 3,
          explain: {
            pl: 'Z jednego niezmiennego obrazu można wystartować dowolną liczbę kontenerów. Obraz się buduje i wersjonuje, kontenery się uruchamia i ubija.',
            en: 'One immutable image can start any number of containers. Images get built and versioned; containers get started and killed.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Dockerfile instrukcje COPY package.json i RUN npm ci stoją PRZED skopiowaniem kodu źródłowego?',
            en: 'Why do COPY package.json and RUN npm ci come BEFORE copying the source code in a Dockerfile?'
          },
          options: [
            { pl: 'Bo npm odmawia działania, gdy w katalogu jest już kod', en: 'Because npm refuses to run when code is already in the directory' },
            { pl: 'Przez cache warstw: kod zmienia się często, zależności rzadko - przy tej kolejności zmiana kodu przebudowuje tylko wierzchnią warstwę zamiast instalować zależności od zera', en: 'Because of layer caching: code changes often, dependencies rarely - with this order a code change rebuilds only the top layer instead of reinstalling dependencies from scratch' },
            { pl: 'Bo warstwy muszą być ułożone alfabetycznie', en: 'Because layers must be ordered alphabetically' },
            { pl: 'Ze względów bezpieczeństwa: kod musi być kopiowany jako ostatni', en: 'For security reasons: code must always be copied last' }
          ],
          correct: 1,
          explain: {
            pl: 'Build cache-uje warstwy od dołu: zmiana czegokolwiek unieważnia wszystkie warstwy powyżej. Rzeczy rzadko zmieniane (zależności) idą nisko, często zmieniane (kod) na górę - rebuild trwa sekundy zamiast minut.',
            en: 'Builds cache layers bottom-up: changing anything invalidates every layer above it. Rarely-changing things (dependencies) go low, frequently-changing things (code) go on top - rebuilds take seconds instead of minutes.'
          }
        },
        {
          q: {
            pl: 'Kontener startuje w ~100 ms, a maszyna wirtualna w minutę-dwie. Co jest głównym źródłem tej różnicy?',
            en: 'A container starts in ~100 ms and a virtual machine in a minute or two. What is the main source of the difference?'
          },
          options: [
            { pl: 'Kontenery są pisane w szybszych językach programowania', en: 'Containers are written in faster programming languages' },
            { pl: 'Maszyny wirtualne działają na wolniejszych dyskach', en: 'Virtual machines run on slower disks' },
            { pl: 'Kontener współdzieli jądro systemu z gospodarzem i startuje jak proces, a VM musi wybootować cały własny system operacyjny - ceną kontenera jest słabsza izolacja', en: 'A container shares the host kernel and starts like a process, while a VM must boot an entire OS of its own - the price the container pays is weaker isolation' },
            { pl: 'Kontenery nie mają systemu plików, więc nie muszą go ładować', en: 'Containers have no filesystem, so there is nothing to load' }
          ],
          correct: 2,
          explain: {
            pl: 'VM wozi własny kernel i cały system - stąd minuty bootowania i pełna izolacja. Kontener to odgrodzony proces na jądrze gospodarza: start w milisekundy, ale granica bezpieczeństwa jest cieńsza. Ten kompromis wraca w lekcji o serverless.',
            en: 'A VM carries its own kernel and OS - hence minutes of boot and strong isolation. A container is a fenced-off process on the host kernel: millisecond starts, but a thinner security boundary. This trade-off returns in the serverless lesson.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'kubernetes',
      title: {
        pl: 'Kubernetes: orkiestracja kontenerów',
        en: 'Kubernetes: container orchestration'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'orkiestracja', en: 'orchestration' },
          def: {
            pl: 'Automatyczne zarządzanie stadem kontenerów na wielu maszynach: rozmieszczanie, restartowanie po awarii, skalowanie i podpinanie ruchu. Kubernetes to najpopularniejszy orkiestrator.',
            en: 'Automatic management of a herd of containers across many machines: placement, restarts after failure, scaling and traffic wiring. Kubernetes is the most popular orchestrator.'
          }
        },
        {
          term: { pl: 'klaster', en: 'cluster' },
          def: {
            pl: 'Komplet maszyn zarządzanych przez Kubernetes jako jedna całość: control plane (mózg podejmujący decyzje) plus węzły robocze (worker nodes), na których faktycznie działają kontenery.',
            en: 'The full set of machines Kubernetes manages as one unit: the control plane (the decision-making brain) plus worker nodes where containers actually run.'
          }
        },
        {
          term: { pl: 'pod', en: 'pod' },
          def: {
            pl: 'Najmniejsza jednostka w Kubernetes: jeden lub kilka kontenerów uruchamianych zawsze razem, ze wspólną siecią. W praktyce pod = zwykle jeden kontener aplikacji. Pody są jednorazowe - umierają i powstają nowe, z nowymi adresami IP.',
            en: 'The smallest unit in Kubernetes: one or a few containers always run together, sharing a network. In practice a pod = usually one app container. Pods are disposable - they die and new ones appear, with new IP addresses.'
          }
        },
        {
          term: { pl: 'Deployment', en: 'Deployment' },
          def: {
            pl: 'Deklaracja w stylu "chcę 3 repliki obrazu myapp:1.4". Kubernetes sam pilnuje, żeby tyle podów faktycznie działało, i sam przeprowadza rolling update przy zmianie obrazu.',
            en: 'A declaration in the style of "I want 3 replicas of image myapp:1.4". Kubernetes keeps that many pods actually running and performs rolling updates itself when the image changes.'
          }
        },
        {
          term: { pl: 'Service', en: 'Service' },
          def: {
            pl: 'Stały wewnętrzny adres nałożony na zmienną grupę podów. Pody przychodzą i odchodzą ze zmiennymi IP, a Service zawsze wskazuje na te aktualnie żywe i rozdziela między nie ruch - wewnętrzny load balancer klastra.',
            en: 'A stable internal address layered over a changing group of pods. Pods come and go with shifting IPs, while the Service always points at the currently alive ones and spreads traffic between them - the internal load balancer of the cluster.'
          }
        },
        {
          term: { pl: 'stan pożądany (desired state)', en: 'desired state' },
          def: {
            pl: 'To, co zadeklarowałeś w YAML-u: jakie obrazy, ile replik, jakie zasoby. Pętla rekoncyliacji bez przerwy porównuje stan faktyczny z pożądanym i niweluje różnice - jak React godzący DOM z tym, co zwróciło render().',
            en: 'What you declared in YAML: which images, how many replicas, what resources. The reconciliation loop endlessly compares actual state with desired state and closes the gap - like React reconciling the DOM with what render() returned.'
          }
        },
        {
          term: { pl: 'kubectl', en: 'kubectl' },
          def: {
            pl: 'Narzędzie wiersza poleceń do rozmowy z klastrem: kubectl apply -f app.yaml wysyła deklaracje, kubectl get pods pokazuje stan, kubectl logs czyta logi poda.',
            en: 'The command line tool for talking to a cluster: kubectl apply -f app.yaml submits declarations, kubectl get pods shows state, kubectl logs reads pod logs.'
          }
        },
        {
          term: { pl: 'HPA', en: 'HPA' },
          def: {
            pl: 'Horizontal Pod Autoscaler - autoscaling na poziomie podów: dokłada i zabiera repliki na podstawie metryk (CPU, pamięć, metryki własne). Ten sam pomysł co autoscaling VM-ek, tylko w sekundach zamiast minut, bo pod startuje błyskawicznie.',
            en: 'Horizontal Pod Autoscaler - autoscaling at the pod level: adds and removes replicas based on metrics (CPU, memory, custom). Same idea as VM autoscaling, but in seconds instead of minutes, because pods start fast.'
          }
        },
        {
          term: { pl: 'probes (readiness i liveness)', en: 'probes (readiness and liveness)' },
          def: {
            pl: 'Health checki podów. Readiness: "czy mogę dostawać ruch?" - niegotowy pod jest omijany przez Service. Liveness: "czy żyję?" - wisząca aplikacja zostaje ubita i wystartowana od nowa.',
            en: 'Pod health checks. Readiness: "can I take traffic?" - a not-ready pod is skipped by the Service. Liveness: "am I alive?" - a hung app gets killed and restarted.'
          }
        },
        {
          term: { pl: 'zarządzany Kubernetes (EKS / AKS / GKE)', en: 'managed Kubernetes (EKS / AKS / GKE)' },
          def: {
            pl: 'Kubernetes, w którym control plane utrzymuje dostawca chmury (AWS EKS, Azure AKS, Google GKE), a ty zarządzasz węzłami i tym, co na nich działa. Standard w firmach - własnoręczne stawianie klastra od zera to dziś rzadkość.',
            en: 'Kubernetes where the cloud provider runs the control plane (AWS EKS, Azure AKS, Google GKE) and you manage the nodes and what runs on them. The company standard - hand-building a cluster from scratch is rare today.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="16" width="600" height="360" rx="14" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="42" text-anchor="middle" font-size="15" fill="var(--text)">cluster</text>' +
          '<rect x="40" y="56" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="84" text-anchor="middle" font-size="14" fill="var(--text)">control plane</text>' +
          '<text x="320" y="106" text-anchor="middle" font-size="12" fill="var(--muted)">stores desired state (YAML) - schedules pods - reconciles drift</text>' +
          '<line x1="180" y1="126" x2="180" y2="166" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c4)"/>' +
          '<line x1="460" y1="126" x2="460" y2="166" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c4)"/>' +
          '<rect x="50" y="170" width="260" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="180" y="194" text-anchor="middle" font-size="13" fill="var(--muted)">node 1 (a VM)</text>' +
          '<rect x="66" y="208" width="105" height="72" rx="10" fill="var(--accent2)" opacity="0.35"/>' +
          '<text x="118" y="238" text-anchor="middle" font-size="13" fill="var(--text)">pod</text>' +
          '<text x="118" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">myapp v1</text>' +
          '<rect x="188" y="208" width="105" height="72" rx="10" fill="var(--accent2)" opacity="0.35"/>' +
          '<text x="240" y="238" text-anchor="middle" font-size="13" fill="var(--text)">pod</text>' +
          '<text x="240" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">myapp v1</text>' +
          '<rect x="330" y="170" width="260" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="460" y="194" text-anchor="middle" font-size="13" fill="var(--muted)">node 2 (a VM)</text>' +
          '<rect x="346" y="208" width="105" height="72" rx="10" fill="var(--accent2)" opacity="0.35"/>' +
          '<text x="398" y="238" text-anchor="middle" font-size="13" fill="var(--text)">pod</text>' +
          '<text x="398" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">myapp v1</text>' +
          '<rect x="468" y="208" width="105" height="72" rx="10" fill="var(--warn)" opacity="0.3"/>' +
          '<text x="520" y="238" text-anchor="middle" font-size="13" fill="var(--text)">pod</text>' +
          '<text x="520" y="258" text-anchor="middle" font-size="11" fill="var(--muted)">other app</text>' +
          '<rect x="200" y="318" width="240" height="44" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="338" text-anchor="middle" font-size="13" fill="var(--text)">Service: myapp</text>' +
          '<text x="320" y="355" text-anchor="middle" font-size="11" fill="var(--muted)">stable address over live pods</text>' +
          '<text x="320" y="404" text-anchor="middle" font-size="13" fill="var(--muted)">you declare the target in YAML - the cluster makes reality match it</text>' +
          '<text x="320" y="428" text-anchor="middle" font-size="13" fill="var(--muted)">pods are cattle: they die, move between nodes and change IPs</text>' +
          '</svg>',
        caption: {
          pl: 'Anatomia klastra: control plane trzyma stan pożądany i rozmieszcza pody na węzłach, a Service daje stały adres ponad zmiennymi podami.',
          en: 'Cluster anatomy: the control plane holds desired state and places pods on nodes, while a Service provides a stable address over ever-changing pods.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Jedna pętla, dwa cuda: samonaprawianie po awarii poda i wdrożenie nowej wersji bez sekundy przerwy - oba to tylko "goń stan pożądany".',
            en: 'One loop, two miracles: self-healing after a pod dies and deploying a new version with zero downtime - both are just "chase the desired state".'
          },
          frames: [
            {
              svg: k8sFrame('3 x v1', '3 x v1', 'var(--ok)',
                k8sPod(20, 'pod-a1', 'v1, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-b7', 'v1, running', 'var(--ok)', 1) +
                k8sPod(490, 'pod-c2', 'v1, running', 'var(--ok)', 1),
                'Steady state: observed matches desired', 'You declared replicas: 3 in YAML. Three pods run across the nodes.',
                'Nobody is doing anything - and that is the point.', 'var(--ok)'),
              label: { pl: '1. Stan zgodny', en: '1. In sync' },
              note: {
                pl: 'Deklaracja z YAML-a mówi: 3 repliki obrazu v1. Stan faktyczny się zgadza, więc pętla rekoncyliacji nie ma nic do roboty.',
                en: 'The YAML declaration says: 3 replicas of image v1. Reality matches, so the reconciliation loop has nothing to do.'
              }
            },
            {
              svg: k8sFrame('3 x v1', '2 x v1 !', 'var(--err)',
                k8sPod(20, 'pod-a1', 'v1, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-b7', 'CRASHED', 'var(--err)', 0.5) +
                k8sPod(490, 'pod-c2', 'v1, running', 'var(--ok)', 1),
                'A pod dies at 3 a.m.', 'Observed (2) no longer equals desired (3). The loop sees the drift instantly.',
                'No pager goes off. No human wakes up.', 'var(--err)'),
              label: { pl: '2. Awaria', en: '2. A crash' },
              note: {
                pl: 'Węzeł padł albo proces się wysypał - obojętne. Liczy się jedno: stan faktyczny rozjechał się z pożądanym i system to widzi.',
                en: 'A node died or the process blew up - does not matter. What matters: actual state drifted from desired, and the system sees it.'
              }
            },
            {
              svg: k8sFrame('3 x v1', '2 + 1 starting', 'var(--warn)',
                k8sPod(20, 'pod-a1', 'v1, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-d4', 'v1, starting...', 'var(--accent)', 1) +
                k8sPod(490, 'pod-c2', 'v1, running', 'var(--ok)', 1),
                'Self-healing: a replacement is scheduled', 'The scheduler picks a healthy node and starts a fresh pod from the image.',
                'Seconds later observed = desired again. Loop closed.', 'var(--accent)'),
              label: { pl: '3. Samonaprawa', en: '3. Self-healing' },
              note: {
                pl: 'Zastępczy pod dostaje nowe imię i nowe IP - dlatego nikt nie łączy się z podami bezpośrednio, tylko przez Service, który zawsze wskazuje żywe sztuki.',
                en: 'The replacement pod gets a new name and a new IP - which is why nobody talks to pods directly, only through the Service, which always points at live ones.'
              }
            },
            {
              svg: k8sFrame('3 x v2', '3 x v1', 'var(--warn)',
                k8sPod(20, 'pod-a1', 'v1, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-d4', 'v1, running', 'var(--ok)', 1) +
                k8sPod(490, 'pod-c2', 'v1, running', 'var(--ok)', 1),
                'You deploy: image v1 -> v2 in the YAML', 'kubectl apply changes only the DESIRED state. Reality is now outdated.',
                'The same loop that fixed the crash will now do the deploy.', 'var(--warn)'),
              label: { pl: '4. Wdrożenie = nowy cel', en: '4. A deploy = a new target' },
              note: {
                pl: 'Zmiana wersji aplikacji to w Kubernetes tylko edycja stanu pożądanego. Nie wydajesz rozkazów "zatrzymaj, podmień, uruchom" - przesuwasz cel i czekasz, aż pętla go dogoni. Jak setState w React.',
                en: 'Shipping a new version is, in Kubernetes, just an edit of desired state. You issue no "stop, swap, start" commands - you move the target and let the loop chase it. Like setState in React.'
              }
            },
            {
              svg: k8sFrame('3 x v2', '2 x v1 + 1 x v2', 'var(--warn)',
                k8sPod(20, 'pod-a1', 'v1, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-d4', 'v1, running', 'var(--ok)', 1) +
                k8sPod(490, 'pod-e9', 'v2, starting...', 'var(--accent)', 1),
                'Rolling update: one pod at a time', 'A v2 pod starts and must pass its readiness probe before taking traffic.',
                'Only then is one v1 pod terminated. Capacity never drops.', 'var(--accent)'),
              label: { pl: '5. Rolling update', en: '5. Rolling update' },
              note: {
                pl: 'Nowy pod najpierw udowadnia gotowość (readiness probe), dopiero potem stary jest gaszony. Użytkownicy przez cały czas trafiają na działające pody - zero przerwy.',
                en: 'The new pod first proves readiness (readiness probe), only then is an old one shut down. Users hit working pods the whole time - zero downtime.'
              }
            },
            {
              svg: k8sFrame('3 x v2', '3 x v2', 'var(--ok)',
                k8sPod(20, 'pod-f3', 'v2, running', 'var(--ok)', 1) +
                k8sPod(255, 'pod-g5', 'v2, running', 'var(--ok)', 1) +
                k8sPod(490, 'pod-e9', 'v2, running', 'var(--ok)', 1),
                'Deploy complete: drift closed again', 'Crash recovery and deployment were the SAME mechanism: reconcile toward desired.',
                'Rollback? Set desired back to v1 - the loop walks it back.', 'var(--ok)'),
              label: { pl: '6. Cel osiągnięty', en: '6. Target reached' },
              note: {
                pl: 'To jest sedno Kubernetes: awaria, wdrożenie i rollback to jedna i ta sama operacja - domknięcie różnicy między stanem faktycznym a zadeklarowanym.',
                en: 'This is the essence of Kubernetes: crash recovery, deployment and rollback are one and the same operation - closing the gap between actual and declared state.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Pomyśl o termostacie. Nie mówisz mu: "włącz grzanie na 12 minut, potem przerwa". Mówisz: <strong>ma być 21 stopni</strong>. A termostat sam kombinuje: za zimno - grzeje, za ciepło - przestaje. Ty ustawiasz cel, on pilnuje rzeczywistości.</p>' +
            '<p><strong>Kubernetes to termostat dla aplikacji.</strong> Z poprzedniej lekcji masz pudła-kontenery. Ale jak masz ich pięćdziesiąt na dziesięciu maszynach, robi się problem: które pudło na której maszynie? Kto je postawi z powrotem, jak padnie? Kto dostawi nowe, jak przyjdzie ruch? Zatrudnianie człowieka, który to ręcznie klika, byłoby szaleństwem.</p>' +
            '<p>Więc zamiast wydawać rozkazy, piszesz na kartce życzenie: "zawsze trzy kopie mojej aplikacji, wersja 1". I wieszasz kartkę na lodówce. Kubernetes czyta ją bez przerwy, w kółko, i porównuje z rzeczywistością. Są trzy kopie? Śpi. Jedna padła o trzeciej w nocy? Zauważa w sekundę i stawia nową - nikt się nawet nie budzi.</p>' +
            '<p>A jak chcesz wydać nową wersję aplikacji? Nie zatrzymujesz niczego. Po prostu poprawiasz kartkę: "wersja 2". Kubernetes widzi różnicę i podmienia kopie jedna po drugiej, tak żeby klienci niczego nie poczuli. Cała mądrość w jednym zdaniu: <strong>nie mówisz maszynom, co mają robić - mówisz, jak ma wyglądać świat, a one same do tego dążą</strong>.</p>',
          en: '<p>Think of a thermostat. You do not tell it: "heat for 12 minutes, then pause". You tell it: <strong>it should be 21 degrees</strong>. The thermostat figures the rest out: too cold - heat, too warm - stop. You set the goal, it polices reality.</p>' +
            '<p><strong>Kubernetes is a thermostat for applications.</strong> From the last lesson you have container boxes. But with fifty of them across ten machines, trouble starts: which box on which machine? Who puts one back up when it falls? Who adds more when traffic comes? Hiring a person to click all this by hand would be madness.</p>' +
            '<p>So instead of giving orders, you write a wish on a note: "always three copies of my app, version 1". And you stick the note on the fridge. Kubernetes reads it constantly, on a loop, and compares it with reality. Three copies running? It sleeps. One died at 3 a.m.? It notices within a second and starts a new one - nobody even wakes up.</p>' +
            '<p>And when you want to ship a new version? You stop nothing. You just edit the note: "version 2". Kubernetes sees the difference and swaps the copies one by one, so customers feel nothing. The whole wisdom in one sentence: <strong>you do not tell the machines what to do - you tell them what the world should look like, and they chase it</strong>.</p>'
        },
        school: {
          pl: '<p>Docker rozwiązał problem "jak zapakować aplikację". Natychmiast pojawił się następny: "kto zarządza pięćdziesięcioma kontenerami na dziesięciu maszynach?". Odpowiedzią jest <strong>orkiestracja</strong>, a jej standardem - <strong>Kubernetes</strong> (w skrócie K8s: K, osiem liter, s). To system, który dostaje twoje kontenery i deklarację, jak ma wyglądać świat, a potem sam rozmieszcza je po maszynach, restartuje po awariach, skaluje i podpina ruch.</p>' +
            '<p>Słownik minimum, w kolejności od dołu:</p>' +
            '<ul>' +
            '<li><strong>Klaster</strong> - komplet maszyn pod zarządem K8s: <strong>control plane</strong> (mózg) plus <strong>węzły</strong> (worker nodes - zwykłe VM-ki, na których faktycznie działają kontenery).</li>' +
            '<li><strong>Pod</strong> - najmniejsza jednostka: opakowanie na jeden (zwykle) kontener. Pody są jednorazowe: umierają, powstają nowe, z innymi adresami IP.</li>' +
            '<li><strong>Deployment</strong> - deklaracja "chcę N replik obrazu X". To on utrzymuje liczbę podów i przeprowadza aktualizacje.</li>' +
            '<li><strong>Service</strong> - stały adres nałożony na zmienną grupę podów, z wewnętrznym rozkładaniem ruchu. Inne aplikacje mówią do Service, nigdy do konkretnego poda.</li>' +
            '</ul>' +
            '<p>Deklaracje pisze się w <strong>YAML-u</strong> (formacie konfiguracji opartym na wcięciach, znanym z plików CI) i wysyła narzędziem <strong>kubectl</strong>:</p>' +
            '<pre><code>apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - name: myapp\n          image: registry.io/myapp:1.4.2</code></pre>' +
            '<p><code>kubectl apply -f app.yaml</code> nie wykonuje tych trzech podów "ręcznie" - zapisuje tylko <strong>stan pożądany</strong> w control plane. Dalej działa <strong>pętla rekoncyliacji</strong>: bez przerwy porównuje stan faktyczny z pożądanym i niweluje różnice. Pod padł? Różnica - stawiamy nowy. Zmieniłeś obraz na 1.5.0? Różnica - podmieniamy pody po kolei (rolling update), czekając aż nowy przejdzie health check, zanim zgasimy stary.</p>' +
            '<p>Jeśli to brzmi znajomo, to słusznie: <strong>to jest deklaratywność Reacta przeniesiona na infrastrukturę</strong>. W React nie mówisz "dopisz div do DOM" - zwracasz z render() docelowy widok, a biblioteka godzi z nim rzeczywisty DOM. W K8s nie mówisz "uruchom kontener na maszynie 7" - deklarujesz docelowy stan klastra, a system godzi z nim rzeczywistość. Nawet słowo jest to samo: rekoncyliacja.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Kubernetes = deklaratywny termostat na kontenery: klaster to maszyny, pod to opakowany kontener, Deployment mówi ile i czego, Service daje stały adres. Ty edytujesz stan pożądany, pętla rekoncyliacji dogania go w rzeczywistości - i dokładnie ten sam mechanizm obsługuje awarie, wdrożenia i rollbacki.</p>',
          en: '<p>Docker solved "how to package an app". The next problem appeared instantly: "who manages fifty containers across ten machines?". The answer is <strong>orchestration</strong>, and its standard is <strong>Kubernetes</strong> (K8s for short: K, eight letters, s). It is a system that takes your containers plus a declaration of how the world should look, then places them on machines, restarts them after failures, scales them and wires up traffic - by itself.</p>' +
            '<p>The minimum vocabulary, bottom-up:</p>' +
            '<ul>' +
            '<li><strong>Cluster</strong> - the machines under K8s management: the <strong>control plane</strong> (the brain) plus <strong>nodes</strong> (worker nodes - ordinary VMs where containers actually run).</li>' +
            '<li><strong>Pod</strong> - the smallest unit: a wrapper around (usually) one container. Pods are disposable: they die and new ones appear with different IP addresses.</li>' +
            '<li><strong>Deployment</strong> - the declaration "I want N replicas of image X". It maintains the pod count and performs updates.</li>' +
            '<li><strong>Service</strong> - a stable address over a changing group of pods, with internal traffic spreading. Other apps talk to the Service, never to a specific pod.</li>' +
            '</ul>' +
            '<p>Declarations are written in <strong>YAML</strong> (the indentation-based config format known from CI files) and submitted with <strong>kubectl</strong>:</p>' +
            '<pre><code>apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - name: myapp\n          image: registry.io/myapp:1.4.2</code></pre>' +
            '<p><code>kubectl apply -f app.yaml</code> does not start those three pods "by hand" - it only records the <strong>desired state</strong> in the control plane. Then the <strong>reconciliation loop</strong> takes over: it endlessly compares actual state with desired state and closes the gap. A pod died? A gap - start a new one. You changed the image to 1.5.0? A gap - swap pods one by one (a rolling update), waiting for each new pod to pass its health check before killing an old one.</p>' +
            '<p>If this sounds familiar, it should: <strong>it is React declarativeness applied to infrastructure</strong>. In React you do not say "append a div to the DOM" - you return the target view from render() and the library reconciles the real DOM with it. In K8s you do not say "run a container on machine 7" - you declare the target cluster state and the system reconciles reality with it. Even the word is the same: reconciliation.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Kubernetes = a declarative thermostat for containers: the cluster is machines, a pod is a wrapped container, a Deployment says how many of what, a Service provides the stable address. You edit desired state, the reconciliation loop makes reality catch up - and that same mechanism handles failures, deployments and rollbacks.</p>'
        },
        pro: {
          pl: '<p>Na produkcji o jakości życia z Kubernetes decyduje kilka mechanizmów, o których wprowadzenia zwykle milczą. Po pierwsze <strong>probes</strong>, czyli sondy zdrowia: <strong>readiness</strong> ("czy mogę dostawać ruch?") decyduje, czy Service kieruje do poda żądania - pod bez gotowego połączenia z bazą po prostu nie dostaje ruchu; <strong>liveness</strong> ("czy żyję?") ubija zawieszony proces i startuje go od nowa. Źle ustawione sondy to klasyka produkcyjnych pożarów: zbyt agresywny liveness ubija zdrowe pody pod obciążeniem i zamienia mały problem w lawinę restartów.</p>' +
            '<p>Po drugie <strong>requests i limits</strong> - deklaracje zasobów per kontener: <code>requests</code> (ile CPU/pamięci pod potrzebuje - na tej podstawie scheduler wybiera węzeł) i <code>limits</code> (twardy sufit). Przekroczenie limitu pamięci kończy się <strong>OOMKill</strong> (out of memory kill - system zabija proces), co w monitoringu wygląda jak "pod restartuje się co 20 minut bez powodu". Powód zawsze jest: za niski limit albo wyciek pamięci.</p>' +
            '<p>Po trzecie skalowanie: <strong>HPA</strong> (Horizontal Pod Autoscaler) dokłada repliki na podstawie metryk. Pody startują w sekundy (obraz już leży na węźle), więc HPA reaguje na skoki, na które autoscaling VM-ek był za wolny. Gdy podów braknie miejsca na węzłach, drugi automat (cluster autoscaler) dokłada całe węzły - dwie warstwy skalowania, każda w swoim tempie.</p>' +
            '<h4>Kiedy Kubernetes to przesada</h4>' +
            '<p>Uczciwa tabela decyzyjna, której brakuje w większości kursów:</p>' +
            '<ul>' +
            '<li><strong>Masz jedną-dwie usługi i mały zespół bez platform engineera?</strong> Nie bierz K8s. Zarządzane platformy kontenerowe (Cloud Run w GCP, AWS App Runner / Fargate, Azure Container Apps) uruchamiają ten sam obraz Dockera bez klastra, YAML-i i aktualizacji klastra. Ta sama droga wdrożeniowa, ułamek operacyjnego kosztu.</li>' +
            '<li><strong>Masz dziesiątki usług, wiele zespołów, niestandardowe potrzeby (GPU, service mesh - warstwa zarządzająca całą komunikacją między usługami, własne kontrolery)?</strong> K8s jest standardem branżowym i właściwym wyborem - zwłaszcza w wydaniu zarządzanym: <strong>EKS</strong> (AWS), <strong>AKS</strong> (Azure), <strong>GKE</strong> (Google), gdzie control plane utrzymuje dostawca (~70-75 USD miesięcznie plus węzły).</li>' +
            '</ul>' +
            '<p>Koszt ukryty, o którym mówi się szeptem: "podatek K8s" - ktoś musi ogarniać wersje klastra (upgrade co ~4 miesiące), sieć, RBAC (kontrolę dostępu opartą na rolach), limity, monitoring. To realny etat. Firmy bez tego etatu kończą z klastrem, którego wszyscy się boją.</p>' +
            '<h4>Wątek AI</h4>' +
            '<p>W pracy inżyniera AI K8s pojawia się z dwóch stron. Pierwsza: twój backend wołający LLM-y to zwykła aplikacja - dotyczą go readiness, HPA na metrykach kolejki i wszystko powyżej. Druga: serwowanie własnych modeli na GPU - węzły z GPU są drogie (rzędu 1-4 USD za godzinę za kartę), więc kluczowe są automaty skalujące do zera i kolejkowanie zadań; narzędzia typu KServe czy Ray Serve budują to na K8s. Nawet jeśli sam tego nie postawisz, będziesz rozmawiać z ludźmi, którzy to utrzymują - wspólny słownik z tej lekcji wystarczy.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Zacznij od zarządzanej platformy kontenerowej; na K8s przechodź, gdy pojawi się realna potrzeba (skala zespołów, GPU, customizacja) - nie odwrotnie.</li>' +
            '<li>Jeśli dziedziczysz klaster: pierwsze pytania to "jakie probes", "jakie requests/limits" i "kto robi upgrade klastra" - tam mieszkają pożary.</li>' +
            '<li>Na rozmowie: pod vs kontener (pod to opakowanie K8s na kontenery), po co Service (stały adres nad jednorazowymi podami) i dlaczego wdrożenie w K8s to edycja stanu pożądanego, a nie sekwencja komend.</li>' +
            '</ul>',
          en: '<p>In production, quality of life with Kubernetes hinges on a few mechanisms the introductions stay quiet about. First, <strong>probes</strong>: <strong>readiness</strong> ("can I take traffic?") decides whether the Service routes requests to a pod - a pod without a working database connection simply receives no traffic; <strong>liveness</strong> ("am I alive?") kills a hung process and starts it again. Misconfigured probes are the classic production fire: an over-aggressive liveness probe kills healthy pods under load and turns a small problem into a restart avalanche.</p>' +
            '<p>Second, <strong>requests and limits</strong> - per-container resource declarations: <code>requests</code> (what the pod needs - the scheduler picks a node based on it) and <code>limits</code> (the hard ceiling). Exceeding the memory limit ends in an <strong>OOMKill</strong> (out of memory kill - the system kills the process), which in monitoring looks like "the pod restarts every 20 minutes for no reason". There is always a reason: a limit set too low, or a leak.</p>' +
            '<p>Third, scaling: the <strong>HPA</strong> (Horizontal Pod Autoscaler) adds replicas based on metrics. Pods start in seconds (the image is already on the node), so the HPA catches spikes that VM autoscaling was too slow for. When pods no longer fit on the nodes, a second automat (the cluster autoscaler) adds whole nodes - two scaling layers, each at its own pace.</p>' +
            '<h4>When Kubernetes is overkill</h4>' +
            '<p>The honest decision table missing from most courses:</p>' +
            '<ul>' +
            '<li><strong>One or two services and a small team with no platform engineer?</strong> Skip K8s. Managed container platforms (Cloud Run on GCP, AWS App Runner / Fargate, Azure Container Apps) run the same Docker image with no cluster, no YAML pile, no cluster upgrades. Same deployment path, a fraction of the operational cost.</li>' +
            '<li><strong>Dozens of services, many teams, custom needs (GPU, a service mesh - a layer managing all service-to-service traffic, custom controllers)?</strong> K8s is the industry standard and the right call - especially managed: <strong>EKS</strong> (AWS), <strong>AKS</strong> (Azure), <strong>GKE</strong> (Google), where the provider runs the control plane (~70-75 USD monthly plus nodes).</li>' +
            '</ul>' +
            '<p>The hidden cost people mention in whispers: the "K8s tax" - somebody must own cluster versions (an upgrade every ~4 months), networking, RBAC (role-based access control), quotas, monitoring. That is a real headcount. Companies without it end up with a cluster everyone is afraid of.</p>' +
            '<h4>The AI angle</h4>' +
            '<p>K8s enters an AI engineer life from two sides. One: your backend calling LLMs is an ordinary app - readiness probes, HPA on queue metrics and everything above applies. Two: serving your own models on GPUs - GPU nodes are expensive (on the order of 1-4 USD per hour per card), so scale-to-zero automation and job queueing are critical; tools like KServe or Ray Serve build exactly that on K8s. Even if you never set it up yourself, you will talk to the people who run it - the shared vocabulary from this lesson is enough.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Start on a managed container platform; move to K8s when a real need appears (team scale, GPUs, customization) - not the other way round.</li>' +
            '<li>Inheriting a cluster? First questions: "what probes", "what requests/limits" and "who upgrades the cluster" - that is where the fires live.</li>' +
            '<li>In interviews: pod vs container (a pod is the K8s wrapper around containers), why Services exist (a stable address over disposable pods) and why a K8s deploy is an edit of desired state, not a command sequence.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co tak naprawdę robi Kubernetes?',
            en: 'What does Kubernetes actually do?'
          },
          options: [
            { pl: 'Buduje obrazy kontenerów szybciej niż Docker', en: 'Builds container images faster than Docker' },
            { pl: 'Zastępuje load balancer i bazę danych', en: 'Replaces the load balancer and the database' },
            { pl: 'Jest edytorem plików YAML', en: 'It is a YAML file editor' },
            { pl: 'Pilnuje, żeby rzeczywisty stan kontenerów na wielu maszynach bez przerwy zgadzał się z zadeklarowanym stanem pożądanym', en: 'Keeps the actual state of containers across many machines continuously matching the declared desired state' }
          ],
          correct: 3,
          explain: {
            pl: 'K8s to termostat: deklarujesz cel (ile replik, jaki obraz), a pętla rekoncyliacji nieustannie dogania go w rzeczywistości - i to załatwia awarie, skalowanie i wdrożenia jednym mechanizmem.',
            en: 'K8s is a thermostat: you declare the target (how many replicas, which image) and the reconciliation loop keeps chasing it in reality - covering failures, scaling and deploys with one mechanism.'
          }
        },
        {
          q: {
            pl: 'Deployment deklaruje 3 repliki. O trzeciej w nocy jeden pod umiera. Co się dzieje?',
            en: 'A Deployment declares 3 replicas. At 3 a.m. one pod dies. What happens?'
          },
          options: [
            { pl: 'Aplikacja działa na 2 podach do rana, aż ktoś ręcznie doda trzeci', en: 'The app runs on 2 pods until morning, when someone adds the third by hand' },
            { pl: 'Pętla rekoncyliacji wykrywa różnicę między stanem faktycznym (2) a pożądanym (3) i automatycznie startuje zastępczy pod na zdrowym węźle', en: 'The reconciliation loop detects the gap between actual (2) and desired (3) state and automatically starts a replacement pod on a healthy node' },
            { pl: 'Cały klaster restartuje się dla bezpieczeństwa', en: 'The whole cluster restarts to be safe' },
            { pl: 'Kubernetes wysyła alert i czeka na decyzję administratora', en: 'Kubernetes sends an alert and waits for an admin decision' }
          ],
          correct: 1,
          explain: {
            pl: 'Samonaprawa to nic innego jak domknięcie różnicy względem stanu pożądanego - dzieje się w sekundy i bez człowieka. Właśnie za to płaci się orkiestratorowi.',
            en: 'Self-healing is nothing more than closing the gap to desired state - it happens in seconds with no human. That is exactly what an orchestrator is paid for.'
          }
        },
        {
          q: {
            pl: 'Po co istnieje Service, skoro pody i tak mają adresy IP?',
            en: 'Why do Services exist if pods have IP addresses anyway?'
          },
          options: [
            { pl: 'Service szyfruje ruch między podami', en: 'A Service encrypts traffic between pods' },
            { pl: 'Service jest wymagany przez prawo w chmurach publicznych', en: 'A Service is legally required in public clouds' },
            { pl: 'Pody są jednorazowe: umierają i wstają z NOWYMI adresami IP, więc potrzebny jest stały adres, który zawsze wskazuje aktualnie żywe pody i rozdziela między nie ruch', en: 'Pods are disposable: they die and come back with NEW IP addresses, so you need a stable address that always points at the currently alive pods and spreads traffic between them' },
            { pl: 'Service przyspiesza start podów, trzymając je w cache', en: 'A Service speeds up pod starts by caching them' }
          ],
          correct: 2,
          explain: {
            pl: 'Adres konkretnego poda jest bezwartościowy, bo pod może za chwilę nie istnieć. Service to stały punkt zaczepienia nad zmiennym stadem - wewnętrzny load balancer klastra.',
            en: 'The address of a specific pod is worthless because that pod may be gone in a minute. A Service is the fixed anchor over a shifting herd - the internal load balancer of the cluster.'
          }
        },
        {
          q: {
            pl: 'Trzyosobowy zespół ma jedną aplikację API w kontenerze i zero doświadczenia operacyjnego. Chcą wdrożyć się w chmurze. Co jest najrozsądniejsze?',
            en: 'A three-person team has one containerized API app and zero ops experience. They want to deploy to the cloud. What is the sanest choice?'
          },
          options: [
            { pl: 'Zarządzana platforma kontenerowa (np. Cloud Run, App Runner): ten sam obraz Dockera, zero klastra do utrzymania - K8s zostawiamy na czas realnej potrzeby', en: 'A managed container platform (e.g. Cloud Run, App Runner): the same Docker image, no cluster to maintain - leave K8s for when a real need appears' },
            { pl: 'Własny klaster Kubernetes postawiony od zera na VM-kach, bo tak robią duzi', en: 'A self-built Kubernetes cluster on VMs, because that is what the big players do' },
            { pl: 'Zarządzany Kubernetes z pełnym service meshem od pierwszego dnia', en: 'Managed Kubernetes with a full service mesh from day one' },
            { pl: 'Rezygnacja z kontenerów i wgrywanie kodu na serwer przez FTP', en: 'Dropping containers and uploading code to a server over FTP' }
          ],
          correct: 0,
          explain: {
            pl: 'K8s ma realny podatek operacyjny (upgrade, sieć, RBAC, monitoring) - przy jednej usłudze i braku platform engineera to czysty koszt bez zysku. Zarządzane platformy dają tę samą drogę wdrożeniową obrazu bez klastra. Umiejętność powiedzenia "K8s jeszcze nie teraz" to też kompetencja chmurowa.',
            en: 'K8s has a real operational tax (upgrades, networking, RBAC, monitoring) - with one service and no platform engineer it is pure cost, no gain. Managed platforms give the same image-based deployment path without a cluster. Knowing when to say "not K8s yet" is a cloud skill too.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      id: 'serverless',
      title: {
        pl: 'Serverless: funkcje i płacenie za użycie',
        en: 'Serverless: functions and pay-per-use'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'serverless', en: 'serverless' },
          def: {
            pl: 'Model, w którym serwery oczywiście istnieją, ale ty ich nie widzisz i nie utrzymujesz: wgrywasz kod, platforma go uruchamia na żądanie, skaluje od zera do tysięcy i z powrotem, a płacisz wyłącznie za czas wykonania.',
            en: 'A model where servers obviously exist but you never see or maintain them: you upload code, the platform runs it on demand, scales it from zero to thousands and back, and you pay only for execution time.'
          }
        },
        {
          term: { pl: 'FaaS', en: 'FaaS' },
          def: {
            pl: 'Function as a Service - serverless w najczystszej postaci: pojedyncza funkcja uruchamiana w reakcji na zdarzenie (żądanie HTTP, plik w magazynie, wiadomość z kolejki). AWS Lambda, Google Cloud Functions, Azure Functions.',
            en: 'Function as a Service - serverless in its purest form: a single function triggered by an event (an HTTP request, a file landing in storage, a queue message). AWS Lambda, Google Cloud Functions, Azure Functions.'
          }
        },
        {
          term: { pl: 'cold start', en: 'cold start' },
          def: {
            pl: 'Opóźnienie pierwszego żądania po okresie ciszy: platforma musi dopiero powołać środowisko funkcji (kontener, runtime, twój kod). Dla Node to zwykle 100-300 ms; kolejne żądania trafiają w ciepłą instancję i startują natychmiast.',
            en: 'The delay on the first request after a quiet period: the platform must first conjure the function environment (container, runtime, your code). For Node typically 100-300 ms; subsequent requests hit a warm instance and start instantly.'
          }
        },
        {
          term: { pl: 'skalowanie do zera', en: 'scale to zero' },
          def: {
            pl: 'Gdy nie ma ruchu, nie działa NIC i rachunek wynosi zero. Fundamentalna różnica względem VM-ki, która kosztuje tyle samo, czy obsługuje żądania, czy stoi pusta.',
            en: 'With no traffic, NOTHING runs and the bill is zero. The fundamental difference from a VM, which costs the same whether it serves requests or sits empty.'
          }
        },
        {
          term: { pl: 'API Gateway', en: 'API Gateway' },
          def: {
            pl: 'Zarządzana brama HTTP przed funkcjami: przyjmuje żądania z internetu, ogarnia TLS, autoryzację i limity, po czym woła właściwą funkcję. Uwaga na jej limity czasu (np. 29 s w AWS) - dłuższe odpowiedzi wymagają streamingu albo innej drogi.',
            en: 'A managed HTTP gate in front of functions: it accepts requests from the internet, handles TLS, auth and rate limits, then invokes the right function. Mind its timeouts (e.g. 29 s on AWS) - longer responses need streaming or a different path.'
          }
        },
        {
          term: { pl: 'GB-sekunda', en: 'GB-second' },
          def: {
            pl: 'Jednostka rozliczeniowa FaaS: przydzielona pamięć razy czas wykonania. Funkcja z 512 MB działająca 200 ms zużywa 0,1 GB-s. Do tego drobna opłata za samo wywołanie - stąd rachunki za małe API potrafią wynosić centy.',
            en: 'The FaaS billing unit: allocated memory times execution time. A 512 MB function running for 200 ms consumes 0.1 GB-s. Add a tiny per-invocation fee - which is why small API bills can come to cents.'
          }
        },
        {
          term: { pl: 'provisioned concurrency', en: 'provisioned concurrency' },
          def: {
            pl: 'Opłacone z góry, stale ciepłe instancje funkcji - eliminują cold starty tam, gdzie latencja pierwszego żądania boli. Kompromis: wracasz do płacenia za gotowość, jak przy VM-ce.',
            en: 'Pre-paid, permanently warm function instances - they remove cold starts where first-request latency hurts. The trade-off: you are back to paying for readiness, like with a VM.'
          }
        },
        {
          term: { pl: 'limit czasu (timeout)', en: 'timeout' },
          def: {
            pl: 'Twardy sufit czasu wykonania funkcji (Lambda: maksymalnie 15 minut, domyślnie 3 sekundy) oraz osobne limity bram HTTP. Zadania dłuższe niż limit projektuje się inaczej: kolejka plus worker, nie jedna długa funkcja.',
            en: 'The hard ceiling on function execution time (Lambda: 15 minutes max, 3 seconds by default) plus separate limits of HTTP gateways. Work longer than the limit gets designed differently: a queue plus a worker, not one long function.'
          }
        },
        {
          term: { pl: 'kontenery serverless', en: 'serverless containers' },
          def: {
            pl: 'Środek spektrum: dajesz platformie obraz Dockera, a ona skaluje go do zera jak funkcję - Cloud Run (GCP), Fargate (AWS), Container Apps (Azure). Łączy przenośność kontenerów z rozliczaniem za użycie i mniej ogranicza niż czyste FaaS.',
            en: 'The middle of the spectrum: you hand the platform a Docker image and it scales it to zero like a function - Cloud Run (GCP), Fargate (AWS), Container Apps (Azure). Container portability plus usage billing, with fewer constraints than pure FaaS.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="36" width="130" height="54" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="85" y="68" text-anchor="middle" font-size="14" fill="var(--text)">request</text>' +
          '<line x1="150" y1="63" x2="205" y2="63" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c5)"/>' +
          '<rect x="210" y="30" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="290" y="58" text-anchor="middle" font-size="14" fill="var(--text)">API Gateway</text>' +
          '<text x="290" y="80" text-anchor="middle" font-size="12" fill="var(--muted)">TLS, auth, limits</text>' +
          '<line x1="370" y1="63" x2="425" y2="63" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c5)"/>' +
          '<rect x="430" y="30" width="190" height="150" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-dasharray="6 5"/>' +
          '<text x="525" y="54" text-anchor="middle" font-size="13" fill="var(--muted)">instances: 0 -> N -> 0</text>' +
          '<rect x="446" y="66" width="158" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="525" y="86" text-anchor="middle" font-size="13" fill="var(--text)">fn: handle(req)</text>' +
          '<text x="525" y="103" text-anchor="middle" font-size="11" fill="var(--muted)">spawned on demand</text>' +
          '<rect x="446" y="122" width="158" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2" opacity="0.55"/>' +
          '<text x="525" y="142" text-anchor="middle" font-size="13" fill="var(--text)">fn: handle(req)</text>' +
          '<text x="525" y="159" text-anchor="middle" font-size="11" fill="var(--muted)">more when busy</text>' +
          '<line x1="525" y1="180" x2="525" y2="222" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c5)"/>' +
          '<rect x="330" y="226" width="290" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="475" y="254" text-anchor="middle" font-size="14" fill="var(--text)">managed services</text>' +
          '<text x="475" y="278" text-anchor="middle" font-size="12" fill="var(--muted)">DB - object storage - queue - Claude API</text>' +
          '<rect x="20" y="130" width="280" height="100" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="158" text-anchor="middle" font-size="14" fill="var(--text)">billing</text>' +
          '<text x="160" y="182" text-anchor="middle" font-size="12" fill="var(--muted)">memory x time (GB-s) + per call</text>' +
          '<text x="160" y="204" text-anchor="middle" font-size="12" fill="var(--muted)">idle = 0.00 USD</text>' +
          '<rect x="20" y="320" width="600" height="86" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="350" text-anchor="middle" font-size="15" fill="var(--text)">No servers to patch, no capacity to plan</text>' +
          '<text x="320" y="376" text-anchor="middle" font-size="13" fill="var(--muted)">the platform conjures instances per request - state must live in external services</text>' +
          '</svg>',
        caption: {
          pl: 'Ścieżka żądania w FaaS: brama HTTP woła funkcję, której instancje platforma powołuje i gasi wedle ruchu; stan mieszka w usługach obok.',
          en: 'The request path in FaaS: the HTTP gate invokes a function whose instances the platform conjures and kills with traffic; state lives in services next door.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Doba z życia funkcji serverless: zero instancji, cold start, ciepłe żądania, nagły szczyt i powrót do zera - z licznikiem kosztów.',
            en: 'A day in the life of a serverless function: zero instances, a cold start, warm requests, a sudden peak and back to zero - with a running cost meter.'
          },
          frames: [
            {
              svg: srvFrame('traffic: none', 'var(--muted)',
                fText(320, 200, '(no instances exist)', 14, 'var(--muted)', 'middle'),
                'cost so far: 0.0000 USD', 'var(--ok)',
                'Night: literally nothing is running', 'No process, no VM, no container - and therefore no bill.',
                'A VM doing the same job would be burning money all night.', 'var(--ok)'),
              label: { pl: '1. Noc: zero instancji', en: '1. Night: zero instances' },
              note: {
                pl: 'Skalowanie do zera dosłownie: kod leży w magazynie platformy, ale nie działa nigdzie. VM-ka za 30 USD miesięcznie w tym czasie po prostu by stała i kosztowała.',
                en: 'Scale to zero, literally: the code sits in platform storage but runs nowhere. A 30 USD per month VM would just stand there costing money.'
              }
            },
            {
              svg: srvFrame('traffic: 1 request', 'var(--warn)',
                srvInst(250, 160, 'instance 1', 'COLD START 280ms', 'var(--warn)', 1),
                'cost so far: 0.0001 USD', 'var(--ok)',
                'First request: the platform builds an instance', 'Pull code, start runtime, run your init - the user waits those extra ~300 ms.',
                'This latency tax is THE serverless trade-off to know.', 'var(--warn)'),
              label: { pl: '2. Cold start', en: '2. The cold start' },
              note: {
                pl: 'Pierwsze żądanie po ciszy płaci podatek: platforma musi dopiero zbudować środowisko. Im cięższe zależności i wolniejsza inicjalizacja, tym dłuższy cold start - dlatego funkcje trzyma się małe.',
                en: 'The first request after silence pays a tax: the platform must build the environment first. Heavier dependencies and slower init mean longer cold starts - one reason to keep functions small.'
              }
            },
            {
              svg: srvFrame('traffic: 5 req/s', 'var(--ok)',
                srvInst(250, 160, 'instance 1', 'warm, ~5ms start', 'var(--ok)', 1),
                'cost so far: 0.0210 USD', 'var(--ok)',
                'Warm instance: requests reuse it instantly', 'While traffic keeps flowing, the same instance serves call after call.',
                'No cold starts now - latency is just your code.', 'var(--ok)'),
              label: { pl: '3. Ciepła instancja', en: '3. Warm instance' },
              note: {
                pl: 'Po cold starcie instancja zostaje ciepła i obsługuje kolejne żądania od ręki. Regularny ruch praktycznie nie widuje cold startów - problem dotyczy głównie rzadko wołanych endpointów.',
                en: 'After the cold start the instance stays warm and serves further requests immediately. Steady traffic rarely sees cold starts - the issue mostly bites rarely-called endpoints.'
              }
            },
            {
              svg: srvFrame('traffic: 400 req/s !', 'var(--err)',
                srvInst(70, 150, 'instance 1', 'warm', 'var(--ok)', 1) +
                srvInst(250, 150, 'instance 2', 'warm', 'var(--ok)', 1) +
                srvInst(430, 150, 'instance 3', 'warm', 'var(--ok)', 1) +
                fText(320, 246, '... x 80 instances, spawned in seconds', 14, 'var(--accent)', 'middle'),
                'cost so far: 0.3400 USD', 'var(--warn)',
                'A spike hits: the platform fans out', 'Each instance handles one request at a time; the platform adds as many as needed.',
                'You wrote zero scaling code. It just happened.', 'var(--accent)'),
              label: { pl: '4. Szczyt: platforma się rozmnaża', en: '4. Peak: the platform fans out' },
              note: {
                pl: 'Newsletter wyszedł, ruch skoczył 80 razy - platforma w sekundy powołała 80 instancji. Autoscaling VM-ek potrzebowałby minut; tu skalowanie nie jest nawet twoją decyzją.',
                en: 'The newsletter went out, traffic jumped 80x - the platform conjured 80 instances in seconds. VM autoscaling would need minutes; here scaling is not even your decision.'
              }
            },
            {
              svg: srvFrame('traffic: none again', 'var(--muted)',
                fText(320, 200, '(instances torn down after idle timeout)', 14, 'var(--muted)', 'middle'),
                'day total: 0.41 USD', 'var(--ok)',
                'Quiet again: instances evaporate', 'A few idle minutes and the platform reclaims everything. Bill stops.',
                'Compare: a VM sized for that peak would cost ~120 USD monthly.', 'var(--ok)'),
              label: { pl: '5. Z powrotem do zera', en: '5. Back to zero' },
              note: {
                pl: 'Po szczycie instancje znikają same. Cała doba z porannym szczytem kosztowała mniej niż kawa - VM-ka gotowa na taki szczyt kosztowałaby sto kilkadziesiąt USD miesięcznie, głównie za stanie.',
                en: 'After the peak the instances vanish on their own. The whole day with its morning spike cost less than a coffee - a VM sized for that peak would run you a hundred-plus USD monthly, mostly for standing still.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Własny samochód kontra taksówka. Samochód kosztuje cię non stop: raty, ubezpieczenie, parking, przegląd - obojętne, czy jeździsz codziennie, czy raz w miesiącu. Taksówka? Płacisz tylko wtedy, kiedy faktycznie jedziesz. Nie myślisz o oleju, oponach ani o tym, gdzie auto nocuje.</p>' +
            '<p><strong>Serverless to taksówka dla twojego kodu.</strong> Maszyna wirtualna z wcześniejszej lekcji to własne auto: działa i kosztuje bez przerwy, nawet gdy nikt z aplikacji nie korzysta. W serverless oddajesz platformie samą funkcję - kawałek kodu, który coś robi - a ona uruchamia go dopiero wtedy, gdy ktoś zapuka. Nikt nie puka? Nie działa NIC i licznik stoi na zerze.</p>' +
            '<p>Nazwa jest trochę kłamstwem: serwery oczywiście istnieją. Po prostu nie są twoim zmartwieniem, tak jak silnik taksówki nie jest zmartwieniem pasażera.</p>' +
            '<p>Haczyk? Jak łapiesz taksówkę o czwartej rano na pustkowiu, chwilę poczekasz, aż podjedzie. Tak samo pierwsze żądanie po długiej ciszy musi poczekać ułamek sekundy, aż platforma "podstawi" twoją funkcję. To się nazywa <strong>cold start</strong> - zimny start. Potem auto już stoi pod domem i kolejne kursy ruszają od razu. I druga rzecz: przy taksówce nie masz bagażnika na stałe - niczego nie zostawisz w środku między kursami. Funkcja też: wszystko, co ma przetrwać, musi odłożyć do wspólnej szafki, zanim zniknie.</p>',
          en: '<p>Owning a car versus taking taxis. The car costs you around the clock: payments, insurance, parking, inspections - whether you drive daily or once a month. A taxi? You pay only when you actually ride. You never think about oil, tires or where the car sleeps.</p>' +
            '<p><strong>Serverless is a taxi for your code.</strong> The virtual machine from the earlier lesson is the owned car: it runs and costs continuously, even when nobody uses the app. In serverless you hand the platform just a function - a piece of code that does one thing - and it runs only when somebody knocks. Nobody knocking? NOTHING runs and the meter reads zero.</p>' +
            '<p>The name is a small lie: servers obviously exist. They are simply not your concern, the way a taxi engine is not the passenger concern.</p>' +
            '<p>The catch? Hail a taxi at 4 a.m. in the middle of nowhere and you wait a moment for it to arrive. Likewise the first request after a long silence waits a fraction of a second while the platform "brings around" your function. That is the <strong>cold start</strong>. Afterwards the car idles outside and the next rides leave instantly. One more thing: a taxi gives you no permanent trunk - you cannot leave things in it between rides. Same for the function: anything meant to survive must be dropped off in the shared locker before it vanishes.</p>'
        },
        school: {
          pl: '<p><strong>Serverless</strong> to model, w którym dostawca całkowicie przejmuje serwery, a ty oddajesz sam kod. Najczystsza postać to <strong>FaaS</strong> (Function as a Service): pojedyncza funkcja - np. <code>handle(request)</code> - uruchamiana w reakcji na zdarzenie: żądanie HTTP, nowy plik w magazynie, wiadomość w kolejce. Główni gracze: <strong>AWS Lambda</strong>, <strong>Google Cloud Functions</strong>, <strong>Azure Functions</strong>. Przed funkcjami HTTP stoi <strong>API Gateway</strong> - zarządzana brama, która ogarnia TLS, autoryzację i limity, zanim zawoła twój kod.</p>' +
            '<p>Dwie cechy definiują ten model. <strong>Skalowanie do zera</strong>: brak ruchu = nic nie działa = rachunek zero; oraz skalowanie w górę bez twojego udziału: platforma powołuje tyle równoległych instancji, ile trzeba, w sekundy. Ceną jest <strong>cold start</strong>: pierwsze żądanie po ciszy czeka 100-300 ms (Node), aż platforma zbuduje środowisko funkcji. Kolejne żądania trafiają w ciepłą instancję.</p>' +
            '<h4>Worked example: ile kosztuje małe API</h4>' +
            '<p>Rozliczenie idzie za <strong>GB-sekundy</strong> (pamięć razy czas) plus grosze za wywołanie. Milion żądań miesięcznie, funkcja 512 MB, średnio 200 ms: 1 000 000 x 0,2 s x 0,5 GB = 100 000 GB-s, czyli około 1,70 USD, plus 0,20 USD za wywołania. <strong>Poniżej 2 USD miesięcznie</strong> za API obsługujące milion żądań - VM-ka gotowa na te same szczyty kosztowałaby 30-60 USD, a do tego ktoś musiałby ją łatać. Dlatego serverless wygrywa przy ruchu małym, nieregularnym albo skokowym; przegrywa przy stałym, wysokim obciążeniu, gdzie stale wynajęta maszyna wychodzi taniej.</p>' +
            '<p>Ważne: funkcje są z definicji <strong>bezstanowe i krótkotrwałe</strong>. Instancja może zniknąć po każdej obsłudze, więc sesje, pliki i liczniki muszą mieszkać na zewnątrz (baza, Redis, magazyn obiektów) - to ta sama zasada, co przy skalowaniu VM-ek, tylko wymuszona jeszcze brutalniej.</p>' +
            '<p>I rzecz, która spina to z twoim światem: <strong>API routes w Next.js na Vercelu i funkcje Netlify to dokładnie to</strong> - twój kod jest pakowany w funkcje serverless i uruchamiany na żądanie. Cold starty, limity czasu, bezstanowość: wszystko, co tu opisane, dotyczy projektów, które być może już masz na koncie.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Serverless = kod uruchamiany na żądanie, skalowany od zera do tysięcy przez platformę, rozliczany za faktyczny czas wykonania. Cold start to podatek od pierwszego żądania po ciszy. Funkcje są bezstanowe i krótkie, a stan mieszka w usługach obok. Vercel i Netlify to serverless w przebraniu.</p>',
          en: '<p><strong>Serverless</strong> is the model where the provider takes over the servers entirely and you hand in just code. The purest form is <strong>FaaS</strong> (Function as a Service): a single function - e.g. <code>handle(request)</code> - triggered by an event: an HTTP request, a new file in storage, a queue message. The main players: <strong>AWS Lambda</strong>, <strong>Google Cloud Functions</strong>, <strong>Azure Functions</strong>. In front of HTTP functions stands an <strong>API Gateway</strong> - a managed gate handling TLS, auth and rate limits before your code is invoked.</p>' +
            '<p>Two properties define the model. <strong>Scale to zero</strong>: no traffic = nothing runs = zero bill; and scaling up without your involvement: the platform conjures as many parallel instances as needed, within seconds. The price is the <strong>cold start</strong>: the first request after silence waits 100-300 ms (Node) while the platform builds the function environment. Subsequent requests hit a warm instance.</p>' +
            '<h4>Worked example: what a small API costs</h4>' +
            '<p>Billing is per <strong>GB-second</strong> (memory times time) plus pennies per invocation. A million requests monthly, a 512 MB function, 200 ms average: 1,000,000 x 0.2 s x 0.5 GB = 100,000 GB-s, about 1.70 USD, plus 0.20 USD for invocations. <strong>Under 2 USD a month</strong> for an API serving a million requests - a VM sized for the same peaks would cost 30-60 USD, and someone would have to patch it. Hence serverless wins for small, irregular or spiky traffic; it loses under steady high load, where an always-rented machine comes out cheaper.</p>' +
            '<p>Important: functions are by definition <strong>stateless and short-lived</strong>. An instance may vanish after any invocation, so sessions, files and counters must live outside (a database, Redis, object storage) - the same rule as with scaled VMs, just enforced even more brutally.</p>' +
            '<p>And the part that ties this to your world: <strong>Next.js API routes on Vercel and Netlify functions are exactly this</strong> - your code gets packaged into serverless functions and run on demand. Cold starts, timeouts, statelessness: everything described here applies to projects you may already have shipped.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Serverless = code run on demand, scaled from zero to thousands by the platform, billed for actual execution time. The cold start is the tax on the first request after silence. Functions are stateless and short, with state living in services next door. Vercel and Netlify are serverless in disguise.</p>'
        },
        pro: {
          pl: '<p>Zawodowa rama myślenia: serverless, kontenery i VM-ki to jedno <strong>spektrum kontroli kontra wygody</strong>, a nie konkurujące religie. VM: pełna kontrola, pełna odpowiedzialność. Czyste FaaS: minimum kontroli, minimum operacji. Pośrodku siedzą <strong>kontenery serverless</strong> - Cloud Run (GCP), Fargate (AWS), Container Apps (Azure): dajesz ten sam obraz Dockera co zawsze, a platforma skaluje go do zera i rozlicza za użycie. Dla zespołu, który już buduje obrazy, to często najlepszy stosunek zysku do bólu: jedna instancja Cloud Run może obsługiwać wiele żądań naraz (ustawiana <em>concurrency</em>), co amortyzuje cold starty i koszty lepiej niż model Lambdy "jedna instancja = jedno żądanie".</p>' +
            '<h4>Limity, które projektują architekturę za ciebie</h4>' +
            '<ul>' +
            '<li><strong>Czas wykonania</strong>: Lambda maksymalnie 15 minut (domyślnie 3 s!), Cloud Run do 60 minut. Ale uwaga: API Gateway w AWS ucina odpowiedź HTTP po <strong>29 sekundach</strong> niezależnie od limitu funkcji.</li>' +
            '<li><strong>Rozmiar</strong>: paczka kodu Lambdy do 250 MB rozpakowane (obrazy kontenerów do 10 GB); pamięć 128 MB - 10 GB, a CPU skaluje się razem z pamięcią.</li>' +
            '<li><strong>Współbieżność</strong>: domyślny limit konta (np. 1000 równoległych instancji) jest współdzielony - jedna rozpędzona funkcja potrafi zagłodzić pozostałe (throttling).</li>' +
            '<li><strong>Dysk</strong>: tylko ulotny /tmp. Wszystko trwałe - na zewnątrz.</li>' +
            '</ul>' +
            '<h4>Serverless a aplikacje LLM - tu mieszka pułapka</h4>' +
            '<p>Typowy endpoint wołający Claude API streamuje odpowiedź 30-120 sekund. Zestaw to z limitem 29 s bramy i masz produkcyjny incydent: żądania ucinane w połowie streamu. Rozwiązania: <strong>Lambda response streaming</strong> (omija bramę, streamuje do 15 min), Cloud Run (limit ustawiasz sam), albo wzorzec asynchroniczny - żądanie wpada do kolejki, worker przetwarza, klient odpytuje o wynik lub dostaje go po WebSockecie (szczegóły w lekcji o zdarzeniach). Druga interakcja: cold start dokłada się do TTFT (time to first token - znasz z modułu o streamingu); dla chatu 300 ms bywa akceptowalne, dla autouzupełniania nie - wtedy provisioned concurrency albo stale ciepły Cloud Run z min-instances=1.</p>' +
            '<h4>Krzywa kosztów ma punkt przecięcia</h4>' +
            '<p>Reguła kciuka: jeśli funkcja jest zajęta średnio powyżej ~30-40% doby, stale działający kontener/VM zaczyna wychodzić taniej. Serverless to opcja na zmienność, nie dogmat: startupy zaczynają od serverless (zero kosztów stałych przy zerowym ruchu), a najgorętsze ścieżki przenoszą na stałe instancje, gdy ruch się ustabilizuje. Miej w arsenale oba modele i licz - rachunek za chmurę to też metryka produktu.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Nowy, nieprzewidywalny ruch: zaczynaj od serverless (najlepiej kontenerów serverless, jeśli już masz Dockera). Stabilny, wysoki: policz punkt przecięcia kosztów.</li>' +
            '<li>Endpointy LLM projektuj od razu pod streaming i limity bram - albo od razu asynchronicznie przez kolejkę.</li>' +
            '<li>Na rozmowie: wyjaśnij cold start i jak go mitygować (mniejsze paczki, provisioned concurrency, min-instances), oraz kiedy serverless PRZEGRYWA - to druga połowa kompetencji.</li>' +
            '</ul>',
          en: '<p>The professional frame: serverless, containers and VMs are one <strong>spectrum of control versus convenience</strong>, not competing religions. VM: full control, full responsibility. Pure FaaS: minimal control, minimal operations. In the middle sit <strong>serverless containers</strong> - Cloud Run (GCP), Fargate (AWS), Container Apps (Azure): you hand over the same Docker image as always and the platform scales it to zero and bills per use. For a team already building images this is often the best pain-to-gain ratio: one Cloud Run instance can serve many requests at once (configurable <em>concurrency</em>), which amortizes cold starts and cost better than the Lambda model of one instance per request.</p>' +
            '<h4>Limits that design your architecture for you</h4>' +
            '<ul>' +
            '<li><strong>Execution time</strong>: Lambda up to 15 minutes (default 3 s!), Cloud Run up to 60. But note: AWS API Gateway cuts an HTTP response after <strong>29 seconds</strong> regardless of the function limit.</li>' +
            '<li><strong>Size</strong>: Lambda code bundle up to 250 MB unpacked (container images up to 10 GB); memory 128 MB - 10 GB, with CPU scaling alongside memory.</li>' +
            '<li><strong>Concurrency</strong>: the account-wide default (e.g. 1000 parallel instances) is shared - one runaway function can starve the rest (throttling).</li>' +
            '<li><strong>Disk</strong>: ephemeral /tmp only. Anything durable - outside.</li>' +
            '</ul>' +
            '<h4>Serverless and LLM apps - where the trap lives</h4>' +
            '<p>A typical endpoint calling the Claude API streams its response for 30-120 seconds. Put that behind a 29 s gateway limit and you have a production incident: requests cut mid-stream. The fixes: <strong>Lambda response streaming</strong> (bypasses the gateway, streams up to 15 min), Cloud Run (you set the limit yourself), or the asynchronous pattern - the request drops into a queue, a worker processes it, the client polls for the result or receives it over a WebSocket (details in the events lesson). The second interaction: a cold start adds itself to TTFT (time to first token - known from the streaming module); for chat 300 ms may be acceptable, for autocomplete it is not - then provisioned concurrency, or an always-warm Cloud Run with min-instances=1.</p>' +
            '<h4>The cost curve has a crossover point</h4>' +
            '<p>Rule of thumb: once a function is busy more than ~30-40% of the day, an always-on container/VM starts coming out cheaper. Serverless is an option for variability, not a dogma: startups begin serverless (zero fixed cost at zero traffic) and move their hottest paths onto permanent instances once traffic stabilizes. Keep both models in the arsenal and do the math - the cloud bill is a product metric too.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>New, unpredictable traffic: start serverless (ideally serverless containers if you already do Docker). Steady and high: compute the cost crossover.</li>' +
            '<li>Design LLM endpoints for streaming and gateway limits from day one - or go asynchronous through a queue from the start.</li>' +
            '<li>In interviews: explain the cold start and its mitigations (smaller bundles, provisioned concurrency, min-instances) and when serverless LOSES - that is the other half of the competence.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co naprawdę oznacza "serverless", skoro serwery istnieją?',
            en: 'What does "serverless" really mean, given that servers exist?'
          },
          options: [
            { pl: 'Kod wykonuje się w przeglądarkach użytkowników zamiast na serwerach', en: 'Code runs in user browsers instead of on servers' },
            { pl: 'Aplikacja działa bez systemu operacyjnego', en: 'The app runs without an operating system' },
            { pl: 'Serwerami w całości zarządza dostawca: ty wgrywasz kod, platforma uruchamia go na żądanie, skaluje od zera i liczy tylko za czas wykonania', en: 'The provider manages the servers entirely: you upload code, the platform runs it on demand, scales from zero and bills only execution time' },
            { pl: 'To marketingowa nazwa na tanie maszyny wirtualne', en: 'A marketing name for cheap virtual machines' }
          ],
          correct: 2,
          explain: {
            pl: 'Serwery są - po prostu nie twoje. Brak ruchu = nic nie działa = zero kosztów; szczyt = platforma sama powołuje setki instancji. Płacisz za wykonanie, nie za gotowość.',
            en: 'The servers are there - just not yours. No traffic = nothing runs = zero cost; a peak = the platform conjures hundreds of instances itself. You pay for execution, not readiness.'
          }
        },
        {
          q: {
            pl: 'Rzadko używany endpoint serverless odpowiada zwykle w 40 ms, ale pierwsze żądanie po godzinie ciszy trwa 350 ms. Co się dzieje?',
            en: 'A rarely used serverless endpoint usually answers in 40 ms, but the first request after an hour of silence takes 350 ms. What is happening?'
          },
          options: [
            { pl: 'Baza danych zasypia razem z funkcją', en: 'The database falls asleep together with the function' },
            { pl: 'Load balancer potrzebuje czasu na znalezienie funkcji', en: 'The load balancer needs time to locate the function' },
            { pl: 'To limit przepustowości nakładany przez API Gateway', en: 'It is a rate limit imposed by the API Gateway' },
            { pl: 'Cold start: po ciszy nie istnieje żadna instancja, więc platforma musi najpierw zbudować środowisko funkcji - kolejne żądania trafiają już w ciepłą instancję', en: 'A cold start: after silence no instance exists, so the platform must first build the function environment - subsequent requests hit an already warm instance' }
          ],
          correct: 3,
          explain: {
            pl: 'Skalowanie do zera ma cenę: pierwszy strzał po przerwie czeka na powołanie instancji (kontener, runtime, inicjalizacja kodu). Mitygacje: mniejsze paczki, provisioned concurrency, minimum ciepłych instancji.',
            en: 'Scale to zero has a price: the first shot after a pause waits for an instance to be conjured (container, runtime, code init). Mitigations: smaller bundles, provisioned concurrency, a minimum of warm instances.'
          }
        },
        {
          q: {
            pl: 'Webhook przyjmuje ~50 tysięcy żądań miesięcznie, nieregularnie, po 100 ms. VM-ka kosztowałaby 30 USD miesięcznie. Co da FaaS?',
            en: 'A webhook takes ~50 thousand requests a month, irregularly, at 100 ms each. A VM would cost 30 USD monthly. What does FaaS give you?'
          },
          options: [
            { pl: 'Koszt rzędu centów miesięcznie i zero serwerów do łatania - to podręcznikowy przypadek dla serverless', en: 'A cost on the order of cents per month and no servers to patch - the textbook case for serverless' },
            { pl: 'Podobny koszt, ale prostszy monitoring', en: 'A similar cost but simpler monitoring' },
            { pl: 'Wyższy koszt, bo FaaS jest zawsze droższy od VM', en: 'A higher cost, because FaaS is always pricier than a VM' },
            { pl: 'FaaS nie obsłuży webhooków, bo wymagają stałego adresu', en: 'FaaS cannot serve webhooks because they need a fixed address' }
          ],
          correct: 0,
          explain: {
            pl: '50k żądań x 0,1 s to ledwie ~5000 sekund obliczeń miesięcznie - grosze w rozliczeniu za GB-sekundy, wobec 30 USD za maszynę stojącą głównie bezczynnie. Ruch mały i nieregularny to naturalny teren serverless; rachunek odwraca się dopiero przy stałym, wysokim obciążeniu.',
            en: '50k requests x 0.1 s is barely ~5000 compute-seconds a month - pennies under GB-second billing, versus 30 USD for a machine standing mostly idle. Small irregular traffic is natural serverless territory; the math only flips under steady heavy load.'
          }
        },
        {
          q: {
            pl: 'Endpoint streamuje odpowiedzi LLM przez ~60 sekund. Stoi za bramą API, która ucina odpowiedzi HTTP po 29 sekundach (limit bramy, nie funkcji). Użytkownicy dostają połowę odpowiedzi. Co robić?',
            en: 'An endpoint streams LLM responses for ~60 seconds. It sits behind an API gateway that cuts HTTP responses at 29 seconds (a gateway limit, not the function limit). Users get half an answer. What to do?'
          },
          options: [
            { pl: 'Zwiększyć pamięć funkcji, żeby liczyła szybciej', en: 'Give the function more memory so it computes faster' },
            { pl: 'Ominąć limit bramy: streaming bez niej (np. response streaming, platforma kontenerowa z własnym limitem) albo wzorzec asynchroniczny z kolejką i odbiorem wyniku', en: 'Route around the gateway limit: streaming without it (e.g. response streaming, a container platform with its own limit) or the asynchronous pattern with a queue and result pickup' },
            { pl: 'Skrócić odpowiedzi modelu do 29 sekund', en: 'Cap model answers at 29 seconds' },
            { pl: 'Wyłączyć TLS, bo szyfrowanie spowalnia stream', en: 'Disable TLS, because encryption slows the stream' }
          ],
          correct: 1,
          explain: {
            pl: 'Limit siedzi w bramie, więc dokładanie zasobów funkcji nic nie da. Długie streamy LLM prowadzi się ścieżką bez tego limitu albo asynchronicznie (kolejka + worker + odbiór wyniku). To jedna z najczęstszych kolizji serverless z aplikacjami AI.',
            en: 'The limit lives in the gateway, so adding function resources changes nothing. Long LLM streams go through a path without that limit, or asynchronously (queue + worker + result pickup). One of the most common serverless-meets-AI collisions.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 6
    {
      id: 'microservices',
      title: {
        pl: 'Monolit kontra mikroserwisy',
        en: 'Monolith versus microservices'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'monolit', en: 'monolith' },
          def: {
            pl: 'Cała aplikacja jako jeden wdrażany artefakt z jedną bazą danych. Moduły wołają się zwykłymi funkcjami w ramach procesu. Prosty w budowie, debugowaniu i wdrażaniu - dopóki nie urośnie za bardzo razem z liczbą zespołów.',
            en: 'The whole application as one deployable artifact with one database. Modules call each other with plain in-process functions. Simple to build, debug and deploy - until it and the number of teams grow too large.'
          }
        },
        {
          term: { pl: 'mikroserwis', en: 'microservice' },
          def: {
            pl: 'Mała usługa z własnym wdrożeniem, własną bazą i wyraźną granicą, rozmawiająca z innymi przez sieć (HTTP/gRPC lub zdarzenia). Zysk: niezależne wdrożenia i skalowanie. Koszt: każda rozmowa to zawodny przeskok sieciowy.',
            en: 'A small service with its own deployment, its own database and a clear boundary, talking to others over the network (HTTP/gRPC or events). The gain: independent deploys and scaling. The cost: every conversation is an unreliable network hop.'
          }
        },
        {
          term: { pl: 'monolit modułowy', en: 'modular monolith' },
          def: {
            pl: 'Monolit z twardymi granicami modułów w kodzie (osobne katalogi, jawne interfejsy, zakaz sięgania w bebechy sąsiada), ale jednym wdrożeniem. Uczciwy domyślny wybór: daje porządek mikroserwisów bez ich podatku sieciowego.',
            en: 'A monolith with hard module boundaries in code (separate directories, explicit interfaces, no reaching into a neighbor internals) but a single deployment. The honest default: microservice discipline without the network tax.'
          }
        },
        {
          term: { pl: 'API gateway', en: 'API gateway' },
          def: {
            pl: 'Jedno wejście do świata usług: klient mówi do bramy, a ta kieruje żądania do właściwych mikroserwisów, ogarniając autoryzację, limity i agregację. Frontend nie musi znać dziesięciu adresów - zna jeden.',
            en: 'The single door into the service world: the client talks to the gateway, which routes requests to the right microservices while handling auth, rate limits and aggregation. The frontend does not learn ten addresses - it learns one.'
          }
        },
        {
          term: { pl: 'kontrakt API', en: 'API contract' },
          def: {
            pl: 'Formalny opis tego, co usługa przyjmuje i zwraca (OpenAPI, schematy zdarzeń). Między usługami różnych zespołów kontrakt jest święty: zmiany łamiące wymagają wersjonowania - dokładnie jak w publicznym API design systemu.',
            en: 'A formal description of what a service accepts and returns (OpenAPI, event schemas). Between services owned by different teams the contract is sacred: breaking changes require versioning - exactly like the public API of a design system.'
          }
        },
        {
          term: { pl: 'spójność ostateczna', en: 'eventual consistency' },
          def: {
            pl: 'W systemie rozproszonym dane w różnych usługach uzgadniają się z opóźnieniem, nie natychmiast: zamówienie już istnieje, a stan magazynu dopiero za chwilę to odnotuje. Cena za brak wspólnej bazy - trzeba ją projektować świadomie.',
            en: 'In a distributed system, data in different services agrees with a delay, not instantly: the order already exists while inventory only records it a moment later. The price of no shared database - it must be designed for consciously.'
          }
        },
        {
          term: { pl: 'rozproszony monolit', en: 'distributed monolith' },
          def: {
            pl: 'Antywzorzec: usługi formalnie osobne, ale tak splątane, że wdrażać trzeba je razem, a awaria jednej kładzie resztę. Łączy wady obu światów: podatek sieciowy mikroserwisów bez ich niezależności.',
            en: 'The anti-pattern: services formally separate but so entangled that they must be deployed together and one failing takes down the rest. It combines the flaws of both worlds: the microservice network tax without the independence.'
          }
        },
        {
          term: { pl: 'śledzenie rozproszone (tracing)', en: 'distributed tracing' },
          def: {
            pl: 'Nadawanie żądaniu identyfikatora korelacji i zbieranie spanów z każdej usługi po drodze (OpenTelemetry, Jaeger), żeby zobaczyć całą trasę i miejsce awarii. Bez tego debugowanie mikroserwisów to zgadywanie. Znasz spany z modułu o evalach - to ten sam mechanizm.',
            en: 'Giving a request a correlation id and collecting spans from every service along the way (OpenTelemetry, Jaeger) to see the full route and the failure point. Without it, debugging microservices is guesswork. You know spans from the evals module - same mechanism.'
          }
        },
        {
          term: { pl: 'prawo Conwaya', en: 'Conway&#39;s law' },
          def: {
            pl: 'Architektura systemu odwzorowuje strukturę komunikacji organizacji, która go buduje. Praktycznie: granice usług wyznacza się wzdłuż granic zespołów - mikroserwisy to w połowie decyzja organizacyjna, nie techniczna.',
            en: 'A system architecture mirrors the communication structure of the organization building it. Practically: service boundaries get drawn along team boundaries - microservices are half an organizational decision, not a technical one.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="165" y="30" text-anchor="middle" font-size="15" fill="var(--text)">monolith</text>' +
          '<rect x="30" y="44" width="270" height="210" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<rect x="50" y="62" width="110" height="40" rx="8" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="105" y="87" text-anchor="middle" font-size="13" fill="var(--text)">auth</text>' +
          '<rect x="170" y="62" width="110" height="40" rx="8" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="225" y="87" text-anchor="middle" font-size="13" fill="var(--text)">orders</text>' +
          '<rect x="50" y="112" width="110" height="40" rx="8" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="105" y="137" text-anchor="middle" font-size="13" fill="var(--text)">search</text>' +
          '<rect x="170" y="112" width="110" height="40" rx="8" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="225" y="137" text-anchor="middle" font-size="13" fill="var(--text)">AI chat</text>' +
          '<text x="165" y="180" text-anchor="middle" font-size="12" fill="var(--muted)">in-process function calls</text>' +
          '<rect x="95" y="196" width="140" height="40" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="165" y="221" text-anchor="middle" font-size="13" fill="var(--text)">one database</text>' +
          '<text x="165" y="280" text-anchor="middle" font-size="12" fill="var(--muted)">one deploy, one scale unit,</text>' +
          '<text x="165" y="300" text-anchor="middle" font-size="12" fill="var(--muted)">one blast radius</text>' +
          '<text x="475" y="30" text-anchor="middle" font-size="15" fill="var(--text)">microservices</text>' +
          '<rect x="400" y="44" width="150" height="40" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="475" y="69" text-anchor="middle" font-size="13" fill="var(--text)">API gateway</text>' +
          '<line x1="430" y1="84" x2="392" y2="112" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="475" y1="84" x2="475" y2="112" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="520" y1="84" x2="558" y2="112" stroke="var(--accent)" stroke-width="2"/>' +
          '<rect x="340" y="116" width="104" height="56" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="392" y="140" text-anchor="middle" font-size="12" fill="var(--text)">orders svc</text>' +
          '<text x="392" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">own DB</text>' +
          '<rect x="423" y="116" width="104" height="56" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="475" y="140" text-anchor="middle" font-size="12" fill="var(--text)">search svc</text>' +
          '<text x="475" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">own DB</text>' +
          '<rect x="506" y="116" width="104" height="56" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="558" y="140" text-anchor="middle" font-size="12" fill="var(--text)">AI chat svc</text>' +
          '<text x="558" y="158" text-anchor="middle" font-size="10" fill="var(--muted)">own DB</text>' +
          '<text x="475" y="200" text-anchor="middle" font-size="12" fill="var(--muted)">network calls + events between services</text>' +
          '<text x="475" y="250" text-anchor="middle" font-size="12" fill="var(--muted)">independent deploys and scaling,</text>' +
          '<text x="475" y="270" text-anchor="middle" font-size="12" fill="var(--muted)">paid for with network complexity</text>' +
          '<rect x="30" y="330" width="580" height="86" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="360" text-anchor="middle" font-size="15" fill="var(--text)">Neither is "modern" - they are trade-offs</text>' +
          '<text x="320" y="386" text-anchor="middle" font-size="13" fill="var(--muted)">a function call becomes a network call: slower, fallible, and owned by another team</text>' +
          '</svg>',
        caption: {
          pl: 'Dwa światy: monolit z jedną bazą i wywołaniami w procesie kontra usługi z własnymi bazami za wspólną bramą, rozmawiające przez sieć.',
          en: 'Two worlds: a monolith with one database and in-process calls versus services with their own databases behind a shared gateway, talking over the network.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Ta sama mała zmiana - poprawka w wyszukiwarce - wdrażana w monolicie i w mikroserwisach. Zysk i podatek na jednym obrazku.',
            en: 'The same small change - a search fix - deployed in a monolith and in microservices. The gain and the tax in one picture.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Monolith: you fixed one line in the search module') +
                '<rect x="170" y="50" width="300" height="176" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
                msModule(190, 66, 120, 'auth', 'var(--accent2)', 0.35) +
                msModule(330, 66, 120, 'orders', 'var(--accent2)', 0.35) +
                msModule(190, 118, 120, 'search *', 'var(--warn)', 0.6) +
                msModule(330, 118, 120, 'AI chat', 'var(--accent2)', 0.35) +
                fText(320, 200, 'one artifact: myapp-2.41.0', 13, 'var(--muted)', 'middle') +
                fPanel('One line changed - the WHOLE app redeploys', 'Build all, test all, ship all. Every team rides the same release train.',
                  'A bug in search can take orders down with it - one blast radius.', 'var(--warn)')
              ),
              label: { pl: '1. Monolit: jedna poprawka', en: '1. Monolith: one fix' },
              note: {
                pl: 'W monolicie nie ma "wdrożenia kawałka" - artefakt jest jeden. Poprawka w wyszukiwarce jedzie tym samym pociągiem co wszystko inne i dzieli z nim ryzyko.',
                en: 'A monolith has no "partial deploy" - there is one artifact. The search fix rides the same train as everything else and shares its risk.'
              }
            },
            {
              svg: svgFrame(
                fHead('Monolith: the price and the comfort') +
                '<rect x="170" y="50" width="300" height="176" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
                msModule(190, 66, 120, 'auth', 'var(--ok)', 0.4) +
                msModule(330, 66, 120, 'orders', 'var(--ok)', 0.4) +
                msModule(190, 118, 120, 'search ok', 'var(--ok)', 0.4) +
                msModule(330, 118, 120, 'AI chat', 'var(--ok)', 0.4) +
                fText(320, 200, 'calls between modules: nanoseconds, typed', 13, 'var(--muted)', 'middle') +
                fPanel('But everyday life is simple', 'One repo, one debugger, one database transaction covers any operation.',
                  'For a small team this simplicity is worth real money.', 'var(--ok)')
              ),
              label: { pl: '2. Monolit: codzienność', en: '2. Monolith: daily life' },
              note: {
                pl: 'Uczciwie: monolit jest wygodny. Wywołania między modułami to zwykłe typowane funkcje, transakcja bazy obejmie każdą operację, a debugger widzi całość. Te wygody znikają po podziale.',
                en: 'Honestly: a monolith is comfortable. Cross-module calls are plain typed functions, one database transaction covers any operation, the debugger sees everything. These comforts vanish after a split.'
              }
            },
            {
              svg: svgFrame(
                fHead('Microservices: the same one-line fix in search') +
                msService(30, 60, 'orders svc', 'v3.2 - untouched', 'var(--border)', 1) +
                msService(252, 60, 'search svc', 'v1.8 -> v1.9 *', 'var(--warn)', 1) +
                msService(474, 60, 'AI chat svc', 'v2.0 - untouched', 'var(--border)', 1) +
                fArrowD(320, 136, 30, 'var(--warn)') +
                fText(320, 196, 'deploy: search only, 90 seconds, own pipeline', 13, 'var(--muted)', 'middle') +
                fText(320, 222, 'orders and AI chat: nobody even noticed', 13, 'var(--ok)', 'middle') +
                fPanel('Deploy only what changed', 'The search team ships on its own schedule, with its own pipeline and rollback.',
                  'Search can also scale alone: 10 replicas of search, 2 of orders.', 'var(--ok)')
              ),
              label: { pl: '3. Mikroserwisy: ta sama poprawka', en: '3. Microservices: the same fix' },
              note: {
                pl: 'To jest obiecany zysk: zespół wyszukiwarki wdraża niezależnie, od razu, z własnym rollbackiem - i skaluje swoją usługę osobno. Przy dziesięciu zespołach ta niezależność jest bezcenna.',
                en: 'This is the promised gain: the search team deploys independently, immediately, with its own rollback - and scales its service separately. With ten teams this independence is priceless.'
              }
            },
            {
              svg: svgFrame(
                fHead('Microservices: the tax collector arrives') +
                msService(30, 60, 'orders svc', 'calls search...', 'var(--border)', 1) +
                msService(252, 60, 'search svc', 'timeout! 3000 ms', 'var(--err)', 1) +
                msService(474, 60, 'AI chat svc', 'waiting on search', 'var(--warn)', 1) +
                fArrowR(166, 92, 86, 'var(--err)') +
                fArrowR(388, 92, 86, 'var(--warn)') +
                fText(320, 196, 'a function call became a network call:', 13, 'var(--muted)', 'middle') +
                fText(320, 220, 'latency + retries + partial failures + tracing needed', 13, 'var(--err)', 'middle') +
                fPanel('The hidden bill of the split', 'In-process nanoseconds become 1-5 ms network hops that can FAIL.',
                  'Debugging needs distributed tracing; data consistency needs design.', 'var(--err)')
              ),
              label: { pl: '4. Podatek sieciowy', en: '4. The network tax' },
              note: {
                pl: 'Każde wywołanie funkcji staje się przeskokiem sieciowym: wolniejszym o kilka rzędów wielkości i - co gorsze - zawodnym. Dochodzą timeouty, retry, częściowe awarie i śledzenie rozproszone. Ten podatek płaci się co miesiąc, nie raz.',
                en: 'Every function call becomes a network hop: several orders of magnitude slower and - worse - fallible. Enter timeouts, retries, partial failures and distributed tracing. This tax is paid monthly, not once.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wielka restauracja z jedną kuchnią kontra food court. W restauracji wszystko powstaje w jednej kuchni: zupy, pizza, sushi, desery. Zaleta: kucharze podają sobie składniki z ręki do ręki, szef ogarnia całość wzrokiem. Wada: gdy kuchnia się zmienia, staje cały lokal. Awaria pieca do pizzy? Nie ma też zupy i sushi, bo kuchnia jest jedna.</p>' +
            '<p>Food court działa inaczej: osobne stoisko z pizzą, osobne z sushi, osobne z lodami. Stoisko sushi może wymienić menu, zamknąć się na remont albo dostawić drugą ladę w upalny dzień - reszta nawet nie mruga. To są <strong>mikroserwisy</strong>: małe, niezależne kawałki aplikacji, każdy ze swoim własnym zapleczem.</p>' +
            '<p>Ale food court ma swój koszt, o którym broszury milczą. Chcesz pizzę i lody? Stoisz w dwóch kolejkach. Stoiska muszą się dogadywać przez radio zamiast przez podanie ręki, a jak sushi zamawia ryż u stoiska obok i tamto akurat nie odpowiada - zamówienie wisi. Koordynacja, która w jednej kuchni była darmowa, tu kosztuje.</p>' +
            '<p>Dlatego mądra odpowiedź na pytanie "kuchnia czy food court?" brzmi: <strong>zależy, ilu masz kucharzy</strong>. Trzech? Jedna kuchnia, bez dyskusji. Dziesięć zespołów kucharskich, które wchodzą sobie w drogę? Czas myśleć o stoiskach.</p>',
          en: '<p>A big restaurant with one kitchen versus a food court. In the restaurant everything comes from a single kitchen: soups, pizza, sushi, desserts. The upside: cooks pass ingredients hand to hand and the chef sees everything at a glance. The downside: when the kitchen changes, the whole place stops. Pizza oven broken? No soup or sushi either, because there is one kitchen.</p>' +
            '<p>A food court works differently: a separate pizza stand, a sushi stand, an ice cream stand. The sushi stand can change its menu, close for renovation or add a second counter on a hot day - the rest do not even blink. These are <strong>microservices</strong>: small, independent pieces of an app, each with its own back room.</p>' +
            '<p>But the food court has a cost the brochures skip. Want pizza and ice cream? You stand in two lines. Stands must coordinate over walkie-talkies instead of handing things over, and when sushi orders rice from the stand next door and that stand happens not to answer - the order hangs. Coordination that was free in one kitchen costs money here.</p>' +
            '<p>So the wise answer to "kitchen or food court?" is: <strong>it depends how many cooks you have</strong>. Three? One kitchen, no discussion. Ten cooking teams stepping on each other? Time to think about stands.</p>'
        },
        school: {
          pl: '<p><strong>Monolit</strong> to cała aplikacja jako jeden wdrażany artefakt: jeden build, jeden deploy, zwykle jedna baza danych. Moduły (auth, zamówienia, wyszukiwarka) wołają się zwykłymi funkcjami w ramach jednego procesu - szybko, typowane, z jedną transakcją bazy na dowolną operację. <strong>Mikroserwisy</strong> tną aplikację na małe usługi: każda ma własny deploy, własną bazę i rozmawia z innymi przez sieć - po HTTP, przez gRPC (binarny, szybszy protokół zdalnych wywołań od Google) albo przez zdarzenia. Przed całością staje zwykle <strong>API gateway</strong>: jedno wejście, które kieruje ruch do właściwych usług.</p>' +
            '<p>Co kupują mikroserwisy? Trzy rzeczy:</p>' +
            '<ul>' +
            '<li><strong>Niezależne wdrożenia</strong>: zespół wyszukiwarki wydaje pięć razy dziennie, nie czekając na pociąg wydań całej firmy.</li>' +
            '<li><strong>Niezależne skalowanie</strong>: gorąca wyszukiwarka dostaje 10 replik, spokojne płatności 2 - zamiast skalować wszystko naraz.</li>' +
            '<li><strong>Autonomię zespołów</strong>: granice usług idą wzdłuż granic zespołów (<strong>prawo Conwaya</strong>: architektura odwzorowuje strukturę organizacji). Usługa może też mieć inny stack - np. serwis AI w Pythonie obok reszty w TypeScript.</li>' +
            '</ul>' +
            '<p>Czym płacisz? Wywołanie funkcji staje się <strong>wywołaniem sieciowym</strong>: z nanosekund robi się 1-5 milisekund, a przede wszystkim pojawia się zawodność - timeouty, retry, częściowe awarie. Debugowanie wymaga <strong>śledzenia rozproszonego</strong> (correlation id plus spany z każdej usługi), a dane rozjechane po bazach uzgadniają się z opóźnieniem (<strong>spójność ostateczna</strong>). Do tego każda usługa to osobny pipeline, monitoring i dyżur.</p>' +
            '<h4>Worked example: sklep internetowy</h4>' +
            '<p>Sklep w monolicie: moduły orders, payments, search, notifications w jednym repo. Zespół rośnie do 40 osób i zaczyna się korek: wdrożenia blokują się nawzajem, wyszukiwarka potrzebuje 10x więcej zasobów niż reszta, a każda awaria kładzie wszystko. Wycinacie search jako pierwszą usługę (ma najmniej powiązań i największe potrzeby skalowania), potem notifications (naturalnie asynchroniczne). Orders i payments zostają w monolicie, bo dzielą transakcje. To jest normalna, dojrzała droga: <strong>monolit najpierw, cięcie tam, gdzie boli</strong>.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Mikroserwisy kupują niezależność wdrożeń, skalowania i zespołów, a kosztują siecią: latencją, zawodnością i złożonością operacyjną. Dla małego zespołu monolit (najlepiej modułowy) jest zwykle właściwy; mikroserwisy stają się opłacalne, gdy ORGANIZACJA jest za duża na jeden pociąg wydań. To decyzja w połowie organizacyjna.</p>',
          en: '<p>A <strong>monolith</strong> is the whole application as one deployable artifact: one build, one deploy, usually one database. Modules (auth, orders, search) call each other with plain functions inside one process - fast, typed, with a single database transaction covering any operation. <strong>Microservices</strong> cut the app into small services: each has its own deploy, its own database and talks to others over the network - HTTP, gRPC (a binary, faster remote-call protocol from Google) or events. In front of it all usually stands an <strong>API gateway</strong>: one entry point routing traffic to the right services.</p>' +
            '<p>What do microservices buy? Three things:</p>' +
            '<ul>' +
            '<li><strong>Independent deploys</strong>: the search team ships five times a day without waiting for the company-wide release train.</li>' +
            '<li><strong>Independent scaling</strong>: hot search gets 10 replicas, quiet payments gets 2 - instead of scaling everything at once.</li>' +
            '<li><strong>Team autonomy</strong>: service boundaries follow team boundaries (<strong>Conway&#39;s law</strong>: architecture mirrors organizational structure). A service can also use a different stack - e.g. an AI service in Python next to a TypeScript codebase.</li>' +
            '</ul>' +
            '<p>What do you pay with? A function call becomes a <strong>network call</strong>: nanoseconds turn into 1-5 milliseconds, and above all unreliability appears - timeouts, retries, partial failures. Debugging requires <strong>distributed tracing</strong> (a correlation id plus spans from each service), and data spread across databases agrees with a delay (<strong>eventual consistency</strong>). On top: every service is its own pipeline, monitoring and on-call.</p>' +
            '<h4>Worked example: the web shop</h4>' +
            '<p>A shop as a monolith: orders, payments, search, notifications in one repo. The team grows to 40 and the traffic jam begins: deploys block each other, search needs 10x the resources of everything else, and any failure downs the lot. You carve out search first (fewest couplings, biggest scaling needs), then notifications (naturally asynchronous). Orders and payments stay in the monolith because they share transactions. That is the normal, mature path: <strong>monolith first, cut where it hurts</strong>.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Microservices buy deploy, scaling and team independence, and cost you the network: latency, unreliability and operational complexity. For a small team a monolith (ideally modular) is usually right; microservices pay off when the ORGANIZATION outgrows one release train. It is half an organizational decision.</p>'
        },
        pro: {
          pl: '<p>Zawodowa wersja tej lekcji to umiejętność powiedzenia, KIEDY ciąć - i jak nie skończyć z najgorszym z możliwych wyników. Sygnały, że czas wycinać usługę z monolitu: wdrożenia zespołów fizycznie się blokują (kolejka do release trains), jeden moduł potrzebuje rzędy wielkości innego skalowania albo innego stacku (typowo: komponent AI w Pythonie), oraz granice domen są już stabilne - bo cięcie po złych granicach jest droższe niż brak cięcia. Reguła kciuka Amazona: usługa ma być utrzymywalna przez zespół karmiony dwiema pizzami.</p>' +
            '<p>Najczęstszy realny wynik przedwczesnego cięcia to <strong>rozproszony monolit</strong>: usługi formalnie osobne, ale sprzężone tak, że wdraża się je razem, a awaria jednej kładzie resztę. Test diagnostyczny: czy możesz wdrożyć usługę A bez koordynowania z zespołem usługi B? Jeśli nie - masz mikroserwisową składkę bez mikroserwisowej wypłaty. Drugi antywzorzec: wspólna baza danych między "niezależnymi" usługami; to sprzężenie przez schemat, które kasuje całą niezależność.</p>' +
            '<h4>Kontrakty to design systemowe API, tylko poważniejsze</h4>' +
            '<p>Między usługami różnych zespołów kontrakt (OpenAPI dla HTTP, schematy dla zdarzeń) pełni tę samą rolę, co publiczne API komponentów w design systemie, który utrzymujesz: zmiany łamiące wymagają wersjonowania i okresu przejściowego, a "wewnętrzne" pola, na których ktoś cichcem polega, stają się publiczne na zawsze (prawo Hyruma w praktyce). Wersjonuje się przez równoległe wersje endpointów i deprecation window, nie przez "wszyscy przejdą w ten weekend".</p>' +
            '<h4>Operacyjny rachunek</h4>' +
            '<ul>' +
            '<li>Przeskok sieciowy w obrębie regionu: ~0,5-2 ms plus serializacja. Łańcuch 5 usług po drodze to już 5-10 ms narzutu i 5 miejsc na timeout - dlatego głębokie łańcuchy synchroniczne się spłaszcza albo zamienia na zdarzenia (następna lekcja).</li>' +
            '<li>Bez <strong>correlation id</strong> propagowanego przez wszystkie usługi (standard: OpenTelemetry) nie zdiagnozujesz niczego. To dosłownie ta sama telemetria spanów, którą znasz z Langfuse przy śledzeniu wywołań LLM - jeden standard, dwa zastosowania.</li>' +
            '<li>Każda usługa mnoży koszty stałe: pipeline, dashboardy, alerty, dyżur. Dziesięć mikroserwisów przy trzyosobowym zespole to 10x operacji przy 0,3 zespołu na usługę - ten rachunek się nie składa.</li>' +
            '</ul>' +
            '<h4>Wątek AI i frontendowy</h4>' +
            '<p>W praktyce inżyniera AI ta lekcja materializuje się tak: funkcjonalność LLM najczęściej JEST osobną usługą (Python/FastAPI obok reszty systemu) - bo ma inny stack, inny profil skalowania (długie, I/O-bound żądania) i szybki cykl zmian. To podręcznikowo dobre granice cięcia. Od strony frontendu znasz zaś <strong>mikrofrontendy</strong> z modułu architektury: to samo równanie zysków (autonomia zespołów) i kosztów (spójność, duplikacja) na innej warstwie - a BFF (backend for frontend) to nic innego jak API gateway skrojony pod jeden frontend.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Domyślnie: monolit modułowy z twardymi granicami w kodzie. Granice, które przeżyją rok, można potem tanio zamienić w granice sieciowe.</li>' +
            '<li>Tnij wzdłuż zespołów i bólu (deploy contention, skalowanie, stack), nigdy "bo tak robi Netflix" - Netflix ma tysiące inżynierów.</li>' +
            '<li>Na rozmowie: najlepsza odpowiedź na "monolit czy mikroserwisy?" zaczyna się od "ile zespołów?", wymienia podatek sieciowy z nazwy i zna termin rozproszony monolit.</li>' +
            '</ul>',
          en: '<p>The professional version of this lesson is knowing WHEN to cut - and how not to land on the worst possible outcome. Signals that it is time to carve a service out of the monolith: team deploys physically block each other (a queue for the release train), one module needs scaling or a stack orders of magnitude different from the rest (typically: an AI component in Python), and domain boundaries are already stable - because cutting along wrong boundaries costs more than not cutting. The Amazon rule of thumb: a service should be maintainable by a team fed with two pizzas.</p>' +
            '<p>The most common real outcome of premature cutting is the <strong>distributed monolith</strong>: services formally separate but coupled so tightly they deploy together and one failing downs the rest. The diagnostic test: can you deploy service A without coordinating with the team of service B? If not - you pay the microservice premium without the microservice payout. The second anti-pattern: a shared database between "independent" services; that is coupling through the schema, and it deletes the independence entirely.</p>' +
            '<h4>Contracts are design-system APIs, only more serious</h4>' +
            '<p>Between services of different teams the contract (OpenAPI for HTTP, schemas for events) plays the same role as the public component API of the design system you maintain: breaking changes require versioning and a transition window, and "internal" fields someone quietly relies on become public forever (Hyrum&#39;s law in practice). You version through parallel endpoint versions and a deprecation window, not through "everyone migrates this weekend".</p>' +
            '<h4>The operational math</h4>' +
            '<ul>' +
            '<li>A network hop within a region: ~0.5-2 ms plus serialization. A chain of 5 services is already 5-10 ms of overhead and 5 timeout opportunities - hence deep synchronous chains get flattened or turned into events (next lesson).</li>' +
            '<li>Without a <strong>correlation id</strong> propagated through every service (standard: OpenTelemetry) you cannot diagnose anything. It is literally the same span telemetry you know from Langfuse tracing of LLM calls - one standard, two uses.</li>' +
            '<li>Every service multiplies fixed costs: pipeline, dashboards, alerts, on-call. Ten microservices with a three-person team is 10x the operations with 0.3 of a team per service - that math does not close.</li>' +
            '</ul>' +
            '<h4>The AI and frontend angles</h4>' +
            '<p>In AI engineering practice this lesson materializes like this: LLM functionality most often IS a separate service (Python/FastAPI next to the rest of the system) - different stack, different scaling profile (long, I/O-bound requests), fast change cycle. Textbook-good cutting boundaries. From the frontend side you know <strong>micro-frontends</strong> from the architecture track: the same equation of gains (team autonomy) and costs (consistency, duplication) on another layer - and a BFF (backend for frontend) is nothing but an API gateway tailored to one frontend.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Default: a modular monolith with hard boundaries in code. Boundaries that survive a year can later be turned into network boundaries cheaply.</li>' +
            '<li>Cut along teams and pain (deploy contention, scaling, stack), never "because Netflix does it" - Netflix has thousands of engineers.</li>' +
            '<li>In interviews: the best answer to "monolith or microservices?" starts with "how many teams?", names the network tax explicitly and knows the term distributed monolith.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest architektura mikroserwisowa?',
            en: 'What is a microservices architecture?'
          },
          options: [
            { pl: 'Sposobem pisania bardzo krótkich funkcji', en: 'A way of writing very short functions' },
            { pl: 'Podziałem aplikacji na małe usługi, z których każda ma własne wdrożenie i bazę, a z innymi rozmawia przez sieć', en: 'Splitting an app into small services, each with its own deployment and database, talking to the others over the network' },
            { pl: 'Uruchamianiem aplikacji na wielu maszynach wirtualnych', en: 'Running an app on many virtual machines' },
            { pl: 'Architekturą, w której frontend i backend są w osobnych repozytoriach', en: 'An architecture where frontend and backend live in separate repos' }
          ],
          correct: 1,
          explain: {
            pl: 'Sednem jest niezależność jednostek wdrożenia: osobne usługi, osobne bazy, komunikacja sieciowa. Samo skalowanie monolitu na wiele maszyn to wciąż monolit.',
            en: 'The essence is independent deployment units: separate services, separate databases, network communication. Scaling a monolith across machines is still a monolith.'
          }
        },
        {
          q: {
            pl: 'Co jest głównym ZYSKIEM z mikroserwisów?',
            en: 'What is the main GAIN of microservices?'
          },
          options: [
            { pl: 'Niezależność: każdy zespół wdraża i skaluje swoją usługę osobno, bez czekania na wspólny pociąg wydań', en: 'Independence: each team deploys and scales its service separately, without waiting for a shared release train' },
            { pl: 'Kod wykonuje się szybciej, bo usługi są mniejsze', en: 'Code runs faster because services are smaller' },
            { pl: 'Znika potrzeba testowania, bo usługi są proste', en: 'Testing becomes unnecessary because services are simple' },
            { pl: 'Aplikacja zużywa mniej pamięci', en: 'The app uses less memory' }
          ],
          correct: 0,
          explain: {
            pl: 'Mikroserwisy to przede wszystkim rozwiązanie problemu ORGANIZACYJNEGO: wiele zespołów blokujących się na jednym artefakcie. Wydajność per żądanie zwykle SPADA (sieć zamiast wywołań w procesie).',
            en: 'Microservices primarily solve an ORGANIZATIONAL problem: many teams blocking on one artifact. Per-request performance usually gets WORSE (network instead of in-process calls).'
          }
        },
        {
          q: {
            pl: 'Po podziale monolitu na usługi wywołanie, które było zwykłą funkcją, idzie teraz przez sieć. Co się w praktyce zmienia?',
            en: 'After splitting a monolith, a call that used to be a plain function now goes over the network. What changes in practice?'
          },
          options: [
            { pl: 'Nic - sieć w centrum danych jest niezawodna', en: 'Nothing - data center networks are reliable' },
            { pl: 'Wywołanie robi się szybsze dzięki równoległości', en: 'The call gets faster thanks to parallelism' },
            { pl: 'Robi się o rzędy wielkości wolniejsze i może SIĘ NIE UDAĆ: dochodzą timeouty, retry, częściowe awarie i potrzeba śledzenia rozproszonego', en: 'It becomes orders of magnitude slower and it can FAIL: timeouts, retries, partial failures and the need for distributed tracing appear' },
            { pl: 'Zmienia się tylko format danych z JSON na binarny', en: 'Only the data format changes, from JSON to binary' }
          ],
          correct: 2,
          explain: {
            pl: 'To jest podatek sieciowy: nanosekundy stają się milisekundami, a przede wszystkim pojawia się zawodność, której wywołanie w procesie nie miało. Cała inżynieria mikroserwisów (retry, timeouty, tracing, spójność ostateczna) to obsługa tego jednego faktu.',
            en: 'This is the network tax: nanoseconds become milliseconds, and above all unreliability appears where an in-process call had none. Most of microservice engineering (retries, timeouts, tracing, eventual consistency) exists to handle this one fact.'
          }
        },
        {
          q: {
            pl: 'Pięcioosobowy startup projektuje nowy produkt i planuje od pierwszego dnia 12 mikroserwisów, "żeby dobrze skalować". Co podpowiada doświadczenie?',
            en: 'A five-person startup designs a new product and plans 12 microservices from day one, "to scale properly". What does experience say?'
          },
          options: [
            { pl: 'Świetny plan - im wcześniej mikroserwisy, tym łatwiej potem', en: 'Great plan - the earlier the microservices, the easier later' },
            { pl: 'Powinni dodać jeszcze service mesh i osobny klaster na środowisko', en: 'They should add a service mesh and a separate cluster per environment' },
            { pl: 'Mikroserwisy są konieczne, bo monolitów nie da się skalować', en: 'Microservices are mandatory, because monoliths cannot be scaled' },
            { pl: 'Zacznijcie od monolitu modułowego z twardymi granicami w kodzie - 12 usług przy 5 osobach to 12 pipelineow i dyżurów bez zysku z niezależności, a granice domen i tak jeszcze się zmienią', en: 'Start with a modular monolith with hard boundaries in code - 12 services for 5 people means 12 pipelines and on-calls with no independence payoff, and the domain boundaries will shift anyway' }
          ],
          correct: 3,
          explain: {
            pl: 'Mikroserwisy rozwiązują problem wielu zespołów - którego pięcioosobowy startup nie ma. Ma za to pewność, że pierwsze granice domen będą złe, a cięcie po złych granicach boli podwójnie. Monolit modułowy zostawia drzwi otwarte na później.',
            en: 'Microservices solve a many-teams problem - which a five-person startup does not have. What it does have is certainty that its first domain boundaries are wrong, and cutting along wrong boundaries hurts twice. A modular monolith keeps the door open for later.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 7
    {
      id: 'event-driven',
      title: {
        pl: 'Kolejki i architektura zdarzeniowa',
        en: 'Queues and event-driven architecture'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'kolejka (queue)', en: 'queue' },
          def: {
            pl: 'Bufor wiadomości między usługami: producent wrzuca zadanie i idzie dalej, konsument wyjmuje je, kiedy ma moc. Rozprzęga usługi w czasie i amortyzuje skoki ruchu. Przykłady: SQS, RabbitMQ.',
            en: 'A message buffer between services: the producer drops a job and moves on, the consumer picks it up when it has capacity. It decouples services in time and absorbs traffic spikes. Examples: SQS, RabbitMQ.'
          }
        },
        {
          term: { pl: 'producent i konsument', en: 'producer and consumer' },
          def: {
            pl: 'Dwie role wokół kolejki: producent publikuje wiadomości (nie wiedząc, kto je odbierze), konsument (worker) je przetwarza we własnym tempie. Skalujesz ich niezależnie - to sedno rozprzęgnięcia.',
            en: 'The two roles around a queue: the producer publishes messages (without knowing who will receive them), the consumer (worker) processes them at its own pace. You scale them independently - the essence of decoupling.'
          }
        },
        {
          term: { pl: 'pub/sub', en: 'pub/sub' },
          def: {
            pl: 'Publish-subscribe: wiadomość trafia do tematu (topic), a KAŻDY subskrybent dostaje własną kopię. Kolejka rozdziela pracę (jedna wiadomość = jeden odbiorca), pub/sub rozgłasza fakt wielu zainteresowanym naraz.',
            en: 'Publish-subscribe: a message goes to a topic and EVERY subscriber gets its own copy. A queue distributes work (one message = one receiver), pub/sub broadcasts a fact to many interested parties at once.'
          }
        },
        {
          term: { pl: 'zdarzenie (event)', en: 'event' },
          def: {
            pl: 'Komunikat o fakcie, który już zaszedł: "OrderPlaced", "DocumentUploaded" - w czasie przeszłym, bez adresata. Nadawca nie wie i nie musi wiedzieć, kto zareaguje; to odwrotność rozkazu wysyłanego do konkretnej usługi.',
            en: 'A message about a fact that already happened: "OrderPlaced", "DocumentUploaded" - past tense, no addressee. The sender does not know or care who reacts; the opposite of a command sent to a specific service.'
          }
        },
        {
          term: { pl: 'dostarczenie at-least-once', en: 'at-least-once delivery' },
          def: {
            pl: 'Gwarancja większości kolejek: wiadomość dotrze NA PEWNO, ale czasem więcej niż raz (np. gdy worker padł po zrobieniu pracy, a przed potwierdzeniem). Konsekwencja: konsument musi być odporny na duplikaty.',
            en: 'The guarantee of most queues: a message WILL arrive, but sometimes more than once (e.g. when a worker died after doing the work but before acknowledging). Consequence: the consumer must tolerate duplicates.'
          }
        },
        {
          term: { pl: 'idempotencja', en: 'idempotency' },
          def: {
            pl: 'Właściwość operacji, którą można bezpiecznie wykonać wielokrotnie z tym samym skutkiem co raz - np. dzięki kluczowi idempotencji sprawdzanemu przed robotą. Obowiązkowa para z at-least-once; znasz ją z lekcji o niezawodności agentów.',
            en: 'The property of an operation that can safely run multiple times with the same effect as once - e.g. via an idempotency key checked before doing the work. The mandatory partner of at-least-once; you know it from the agent reliability lesson.'
          }
        },
        {
          term: { pl: 'DLQ (dead letter queue)', en: 'DLQ (dead letter queue)' },
          def: {
            pl: 'Boczna kolejka na wiadomości, które mimo kilku prób nie dały się przetworzyć (poison messages). Zamiast blokować resztę albo ginąć, czekają tam na człowieka. Alarm na rosnącą DLQ to jeden z najważniejszych alertów systemu.',
            en: 'A side queue for messages that failed processing despite several attempts (poison messages). Instead of blocking the rest or vanishing, they wait there for a human. An alarm on DLQ growth is one of the most important alerts a system has.'
          }
        },
        {
          term: { pl: 'backpressure', en: 'backpressure' },
          def: {
            pl: 'Sytuacja, w której konsumenci nie nadążają i kolejka rośnie. Głębokość kolejki to uczciwa metryka zaległości - i naturalny sygnał do autoskalowania workerów; alternatywą jest zwalnianie producenta.',
            en: 'The situation where consumers cannot keep up and the queue grows. Queue depth is the honest backlog metric - and a natural autoscaling signal for workers; the alternative is slowing the producer down.'
          }
        },
        {
          term: { pl: 'webhook', en: 'webhook' },
          def: {
            pl: 'Zdarzenie przychodzące z cudzego systemu jako HTTP POST na twój adres (Stripe o płatności, GitHub o pushu). Dobra praktyka: endpoint webhooka tylko wrzuca wiadomość do własnej kolejki i odpowiada 200 - przetwarzanie idzie osobno.',
            en: 'An event arriving from someone else&#39;s system as an HTTP POST to your address (Stripe about a payment, GitHub about a push). Good practice: the webhook endpoint just drops the message onto your own queue and returns 200 - processing happens separately.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="320" y="30" text-anchor="middle" font-size="14" fill="var(--text)">work queue: one message -> ONE worker</text>' +
          '<rect x="30" y="46" width="130" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="95" y="70" text-anchor="middle" font-size="13" fill="var(--text)">API</text>' +
          '<text x="95" y="89" text-anchor="middle" font-size="11" fill="var(--muted)">producer</text>' +
          '<line x1="160" y1="73" x2="215" y2="73" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<rect x="220" y="46" width="180" height="54" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="310" y="70" text-anchor="middle" font-size="13" fill="var(--text)">queue</text>' +
          '<rect x="236" y="78" width="90" height="12" rx="3" fill="var(--warn)" opacity="0.6"/>' +
          '<line x1="400" y1="62" x2="455" y2="52" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<line x1="400" y1="84" x2="455" y2="94" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<rect x="460" y="30" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="57" text-anchor="middle" font-size="12" fill="var(--text)">worker 1</text>' +
          '<rect x="460" y="82" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="109" text-anchor="middle" font-size="12" fill="var(--text)">worker 2</text>' +
          '<text x="320" y="160" text-anchor="middle" font-size="14" fill="var(--text)">pub/sub: one event -> EVERY subscriber</text>' +
          '<rect x="30" y="180" width="130" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="95" y="204" text-anchor="middle" font-size="12" fill="var(--text)">orders svc</text>' +
          '<text x="95" y="222" text-anchor="middle" font-size="11" fill="var(--muted)">OrderPlaced</text>' +
          '<line x1="160" y1="207" x2="215" y2="207" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<rect x="220" y="180" width="180" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="310" y="212" text-anchor="middle" font-size="13" fill="var(--text)">topic: orders</text>' +
          '<line x1="400" y1="190" x2="455" y2="172" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<line x1="400" y1="207" x2="455" y2="217" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<line x1="400" y1="224" x2="455" y2="258" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c7)"/>' +
          '<rect x="460" y="152" width="150" height="40" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="177" text-anchor="middle" font-size="12" fill="var(--text)">email svc</text>' +
          '<rect x="460" y="198" width="150" height="40" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="223" text-anchor="middle" font-size="12" fill="var(--text)">invoice svc</text>' +
          '<rect x="460" y="244" width="150" height="40" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="269" text-anchor="middle" font-size="12" fill="var(--text)">analytics svc</text>' +
          '<rect x="30" y="316" width="580" height="120" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="346" text-anchor="middle" font-size="15" fill="var(--text)">Async = decoupled in time</text>' +
          '<text x="320" y="372" text-anchor="middle" font-size="13" fill="var(--muted)">the producer never waits for the consumer and survives its downtime;</text>' +
          '<text x="320" y="394" text-anchor="middle" font-size="13" fill="var(--muted)">the queue absorbs spikes; new subscribers join without touching the sender</text>' +
          '<text x="320" y="420" text-anchor="middle" font-size="12" fill="var(--muted)">price: duplicates (at-least-once), ordering questions, eventual consistency</text>' +
          '</svg>',
        caption: {
          pl: 'Dwa wzorce asynchroniczne: kolejka robocza rozdziela zadania między workerów, a pub/sub rozgłasza jedno zdarzenie do wszystkich subskrybentów.',
          en: 'The two async patterns: a work queue distributes jobs among workers, while pub/sub broadcasts one event to every subscriber.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Kolejka w akcji: nagły zrzut 500 zadań, workerzy nadrabiają w swoim tempie, jedna trująca wiadomość ląduje w DLQ - i nic nie ginie.',
            en: 'A queue in action: a sudden dump of 500 jobs, workers catching up at their own pace, one poison message landing in the DLQ - and nothing is lost.'
          },
          frames: [
            {
              svg: qFrame('sends 5 jobs/min', 'depth: 1', 12, 'var(--ok)',
                qWorker(48, 'worker 1', 'processing', 'var(--accent2)') + qWorker(112, 'worker 2', 'idle', 'var(--border)'),
                'empty', 'var(--muted)',
                'Steady flow: producer never waits', 'The API drops a job on the queue and instantly answers its own caller.',
                'Workers pull jobs at their own pace. Depth stays near zero.', 'var(--ok)'),
              label: { pl: '1. Zwykły dzień', en: '1. A normal day' },
              note: {
                pl: 'Producent wrzuca zadanie i natychmiast odpowiada swojemu klientowi - nie czeka na wykonanie. To jest rozprzęgnięcie w czasie: nadawca i odbiorca nie muszą być sprawni w tej samej chwili.',
                en: 'The producer drops a job and immediately answers its own caller - it does not wait for execution. That is decoupling in time: sender and receiver need not be healthy at the same moment.'
              }
            },
            {
              svg: qFrame('dumps 500 jobs!', 'depth: 500', 160, 'var(--err)',
                qWorker(48, 'worker 1', 'processing', 'var(--accent2)') + qWorker(112, 'worker 2', 'processing', 'var(--accent2)'),
                'empty', 'var(--muted)',
                'Burst: a batch upload lands at once', 'Nothing crashes and nothing is rejected - the queue simply grows.',
                'Compare with synchronous HTTP: 500 parallel calls would melt the workers.', 'var(--err)'),
              label: { pl: '2. Zrzut 500 zadań', en: '2. A 500-job dump' },
              note: {
                pl: 'Ktoś wgrał 500 dokumentów do zaindeksowania naraz. Kolejka przyjmuje wszystko i rośnie - to jej praca. Bez niej 500 równoczesnych żądań HTTP zabiłoby workerów albo zostało odrzucone.',
                en: 'Someone uploaded 500 documents for indexing at once. The queue accepts everything and grows - that is its job. Without it, 500 simultaneous HTTP requests would kill the workers or get rejected.'
              }
            },
            {
              svg: qFrame('back to 5/min', 'depth: 210 and falling', 88, 'var(--warn)',
                qWorker(48, 'worker 1', 'processing', 'var(--accent2)') + qWorker(112, 'workers 2-4', 'scaled out on depth', 'var(--accent)'),
                'empty', 'var(--muted)',
                'Draining: depth is the honest backlog metric', 'Autoscaling watches queue depth (backpressure) and added workers.',
                'Users see results arriving; nobody saw an error.', 'var(--warn)'),
              label: { pl: '3. Nadrabianie', en: '3. Draining' },
              note: {
                pl: 'Głębokość kolejki to najuczciwsza metryka zaległości - i świetny sygnał do autoskalowania workerów (pamiętasz lekcję o metrykach skalowania?). Zaległość topnieje, świat się nie zawalił.',
                en: 'Queue depth is the most honest backlog metric - and a great autoscaling signal for workers (remember the scaling-metrics lesson?). The backlog melts; the world did not end.'
              }
            },
            {
              svg: qFrame('back to 5/min', 'depth: 40', 30, 'var(--ok)',
                qWorker(48, 'worker 1', 'job 217: FAIL (retry 2/3)', 'var(--err)') + qWorker(112, 'worker 2', 'processing', 'var(--accent2)'),
                'empty', 'var(--muted)',
                'One job keeps failing: retry with backoff', 'The message returns to the queue and will be retried after a delay.',
                'At-least-once delivery: the same job MAY run twice - handlers must be idempotent.', 'var(--err)'),
              label: { pl: '4. Trująca wiadomość', en: '4. A poison message' },
              note: {
                pl: 'Zadanie 217 ma zepsuty PDF i wywala workera za każdym razem. Kolejka ponawia je z rosnącym odstępem (backoff). Uwaga: skoro wiadomość może wrócić, handler musi być idempotentny - wykonanie czegoś dwa razy nie może zepsuć danych.',
                en: 'Job 217 carries a corrupted PDF and crashes the worker every time. The queue retries it with growing delays (backoff). Note: since a message can come back, the handler must be idempotent - running something twice must not corrupt data.'
              }
            },
            {
              svg: qFrame('5/min, all well', 'depth: 0', 6, 'var(--ok)',
                qWorker(48, 'worker 1', 'processing', 'var(--accent2)') + qWorker(112, 'worker 2', 'processing', 'var(--accent2)'),
                '1 message - alert a human', 'var(--warn)',
                'After 3 failures the job moves to the DLQ', 'The poison message stops blocking the line and waits for inspection.',
                'A growing DLQ is a page-someone alert; an empty one is a healthy system.', 'var(--ok)'),
              label: { pl: '5. DLQ: parking dla rozbitków', en: '5. DLQ: the breakdown lane' },
              note: {
                pl: 'Po wyczerpaniu prób wiadomość ląduje w dead letter queue: nie ginie, nie blokuje innych, czeka na człowieka z debuggerem. Monitoring DLQ to jeden z najcenniejszych alertów w systemie asynchronicznym.',
                en: 'After exhausting retries the message lands in the dead letter queue: not lost, not blocking others, waiting for a human with a debugger. DLQ monitoring is one of the most valuable alerts in an async system.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Telefon kontra skrzynka na listy. Telefon jest wymagający: obie osoby muszą być wolne w tej samej chwili. Jak ciocia nie odbiera, to nie pogadasz - i musisz próbować od nowa. Tak działa zwykłe wywołanie w internecie: pytam i STOJĘ, czekając na odpowiedź. Jak po drugiej stronie nikogo nie ma, mam problem.</p>' +
            '<p>List jest sprytniejszy. Wrzucasz go do skrzynki i idziesz na kawę. Ciocia przeczyta wieczorem, jak wróci z działki. Nikt na nikogo nie czeka, a skrzynka cierpliwie trzyma listy - nawet jak przyjdzie ich sto naraz. W informatyce taka skrzynka nazywa się <strong>kolejką</strong>: jedna usługa wrzuca zadania, druga wyjmuje je we własnym tempie.</p>' +
            '<p>Skrzynka ratuje dwie sytuacje. Pierwsza: listonosz przyniósł worek listów naraz (nagły szczyt) - nic nie ginie, po prostu czekają w skrzynce. Druga: ciocia wyjechała na tydzień (usługa nie działa) - listy dalej czekają i dostaną się do rąk, jak wróci.</p>' +
            '<p>Są też dwa haczyki. Czasem list przyjdzie dwa razy (poczta woli dostarczyć podwójnie niż wcale), więc trzeba umieć poznać, że to ten sam - i nie zrobić czegoś drugi raz. A list, którego nijak nie da się doręczyć, ląduje w okienku reklamacji, gdzie zajmie się nim człowiek. W tej lekcji to okienko nazywa się <strong>DLQ</strong> - i naprawdę tak działa.</p>',
          en: '<p>A phone call versus a mailbox. The phone is demanding: both people must be free at the same moment. If your aunt does not pick up, no conversation - and you must try again. That is how a plain internet call works: I ask and I STAND waiting for the answer. If nobody is on the other side, I have a problem.</p>' +
            '<p>A letter is smarter. You drop it in the mailbox and go for coffee. Your aunt reads it in the evening, when she is back from the garden. Nobody waits for anybody, and the mailbox patiently holds letters - even if a hundred arrive at once. In computing this mailbox is called a <strong>queue</strong>: one service drops jobs in, another takes them out at its own pace.</p>' +
            '<p>The mailbox saves two situations. One: the postman brings a whole sack at once (a sudden spike) - nothing is lost, letters simply wait in the box. Two: your aunt leaves for a week (the service is down) - the letters keep waiting and reach her hands when she returns.</p>' +
            '<p>There are two catches. Sometimes a letter arrives twice (the post office prefers delivering twice to not at all), so you must recognize it is the same one - and not do something a second time. And a letter that cannot be delivered at all ends up at the complaints window, where a human takes over. In this lesson that window is called the <strong>DLQ</strong> - and it really works like that.</p>'
        },
        school: {
          pl: '<p>Dotąd wszystko w tym module było <strong>synchroniczne</strong>: żądanie czeka na odpowiedź. To proste, ale sprzęga usługi w czasie - obie muszą działać naraz, a nagły szczyt uderza bezpośrednio w odbiorcę. Alternatywa to komunikacja <strong>asynchroniczna</strong> przez pośrednika, w dwóch wzorcach.</p>' +
            '<p><strong>Kolejka robocza</strong> (work queue - SQS w AWS, RabbitMQ w wersji self-hosted): <strong>producent</strong> wrzuca wiadomość i natychmiast wraca do swoich spraw; <strong>konsument</strong> (worker) wyjmuje wiadomości we własnym tempie. Każdą wiadomość przetwarza dokładnie jeden worker - kolejka ROZDZIELA pracę. Rośnie ruch? Kolejka puchnie zamiast zabijać odbiorcę (to nazywa się <strong>backpressure</strong>), a głębokość kolejki jest naturalnym sygnałem do dołożenia workerów.</p>' +
            '<p><strong>Pub/sub</strong> (publish-subscribe - SNS, Google Pub/Sub, Kafka): nadawca publikuje <strong>zdarzenie</strong> - komunikat o fakcie, który już zaszedł, w czasie przeszłym: "OrderPlaced" - do tematu (topic), a KAŻDY subskrybent dostaje własną kopię. Pub/sub ROZGŁASZA. Piękno tego wzorca: serwis zamówień nie wie, że istnieją mailing, fakturowanie i analityka. Dochodzi czwarty zainteresowany? Subskrybuje temat - nadawcy nie trzeba ruszać.</p>' +
            '<h4>Worked example: pipeline dokumentów w aplikacji AI</h4>' +
            '<p>Użytkownik wgrywa PDF do twojej aplikacji RAG. Synchronicznie? Parsowanie, chunking, embeddingi i zapis do bazy wektorowej potrafią zająć 30-90 sekund - żaden użytkownik tyle nie postoi. Zamiast tego: upload zapisuje plik i publikuje zdarzenie "DocumentUploaded"; worker embeddingów wyjmuje je z kolejki, przetwarza w tle i oznacza dokument jako gotowy; frontend odpytuje o status albo dostaje powiadomienie. Wgranie 500 plików naraz nie zabija niczego - kolejka je buforuje, workerzy nadrabiają. To jest <em>ten</em> wzorzec większości potoków AI: ciężka, wolna robota zawsze idzie przez kolejkę.</p>' +
            '<h4>Dwie zasady bezpieczeństwa</h4>' +
            '<p>Po pierwsze, kolejki gwarantują zwykle <strong>at-least-once</strong>: wiadomość dotrze na pewno, ale czasem dwa razy. Dlatego handler musi być <strong>idempotentny</strong> - sprawdzać, czy roboty już nie wykonano (znasz to z lekcji o niezawodności agentów). Po drugie, wiadomość, która wywala workera raz za razem, po N próbach trafia do <strong>DLQ</strong> (dead letter queue) - bocznej kolejki dla rozbitków, gdzie czeka na człowieka, zamiast blokować resztę.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Kolejka rozdziela pracę i amortyzuje szczyty; pub/sub rozgłasza fakty wielu odbiorcom bez wiedzy nadawcy. Ciężkie zadania (a w AI prawie wszystko jest ciężkie) idą przez kolejkę, handlery są idempotentne, a nieprzetwarzalne wiadomości lądują w DLQ pod alarmem.</p>',
          en: '<p>Everything in this module so far was <strong>synchronous</strong>: a request waits for its response. Simple, but it couples services in time - both must be up at once, and a sudden spike hits the receiver directly. The alternative is <strong>asynchronous</strong> communication through a middleman, in two patterns.</p>' +
            '<p>The <strong>work queue</strong> (SQS on AWS, RabbitMQ self-hosted): the <strong>producer</strong> drops a message and instantly goes back to its business; the <strong>consumer</strong> (worker) takes messages out at its own pace. Each message is processed by exactly one worker - a queue DISTRIBUTES work. Traffic grows? The queue swells instead of killing the receiver (that is <strong>backpressure</strong>), and queue depth is the natural signal for adding workers.</p>' +
            '<p><strong>Pub/sub</strong> (publish-subscribe - SNS, Google Pub/Sub, Kafka): the sender publishes an <strong>event</strong> - a message about a fact that already happened, past tense: "OrderPlaced" - onto a topic, and EVERY subscriber gets its own copy. Pub/sub BROADCASTS. The beauty: the orders service has no idea that mailing, invoicing and analytics exist. A fourth interested party appears? It subscribes to the topic - the sender is never touched.</p>' +
            '<h4>Worked example: the document pipeline of an AI app</h4>' +
            '<p>A user uploads a PDF to your RAG application. Synchronously? Parsing, chunking, embeddings and the vector database write can take 30-90 seconds - no user will stand that long. Instead: the upload stores the file and publishes "DocumentUploaded"; the embedding worker takes it off the queue, processes in the background and marks the document ready; the frontend polls for status or gets a notification. Uploading 500 files at once kills nothing - the queue buffers, workers catch up. This is <em>the</em> pattern of most AI pipelines: heavy, slow work always goes through a queue.</p>' +
            '<h4>Two safety rules</h4>' +
            '<p>First, queues usually guarantee <strong>at-least-once</strong>: the message will arrive, but occasionally twice. So the handler must be <strong>idempotent</strong> - check whether the work is already done (you know this from the agent reliability lesson). Second, a message that crashes the worker again and again moves after N attempts to the <strong>DLQ</strong> (dead letter queue) - the side lane for wrecks, where it waits for a human instead of blocking the rest.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>A queue distributes work and absorbs spikes; pub/sub broadcasts facts to many receivers without the sender knowing. Heavy jobs (and in AI almost everything is heavy) go through a queue, handlers are idempotent, and unprocessable messages land in a DLQ with an alarm on it.</p>'
        },
        pro: {
          pl: '<p>Produkcyjna architektura zdarzeniowa zaczyna się od świadomego wyboru gwarancji. <strong>At-least-once</strong> to standard (SQS standard, wiadomość może przyjść ponownie); <strong>exactly-once</strong> w ogólności nie istnieje na poziomie transportu - osiąga się ją NA POZIOMIE APLIKACJI: klucz idempotencji w bazie (unikalny indeks na message_id) plus operacje bezpieczne przy powtórce. Kolejki <strong>FIFO</strong> dają porządek i deduplikację w obrębie grupy, ale kosztem przepustowości - używa się ich tam, gdzie kolejność jest twarda (księgowania), nie wszędzie "na wszelki wypadek".</p>' +
            '<p>Druga decyzja: <strong>kolejka czy log</strong>. SQS/RabbitMQ to kolejki: wiadomość skonsumowana znika. <strong>Kafka</strong> to trwały log zdarzeń: zapisy zostają na dni lub lata, konsumenci trzymają własne wskaźniki (offsety) i mogą czytać od dowolnego miejsca - stąd replay historii dla nowego konsumenta albo po bugu. Kafka daje też porządek w obrębie partycji i ogromną przepustowość, ale operacyjnie to inna liga. Reguła kciuka: zaczynaj od zarządzanej kolejki (SQS: pierwszy milion wiadomości miesięcznie darmowy, potem ~0,40-0,50 USD za milion); po Kafkę sięgaj, gdy potrzebujesz replaya, wielu niezależnych konsumentów tej samej historii albo strumieni analitycznych.</p>' +
            '<h4>Rzemiosło retry</h4>' +
            '<ul>' +
            '<li><strong>Exponential backoff z jitterem</strong> (rosnące odstępy plus losowość): retry co 1 s, 2 s, 4 s... z rozrzutem, żeby tysiąc wiadomości nie wróciło w tej samej sekundzie (thundering herd).</li>' +
            '<li><strong>Visibility timeout</strong> (SQS): wiadomość wzięta przez workera jest niewidoczna przez X sekund; jak worker padnie, wraca do kolejki. Ustaw X dłuższe niż najwolniejsze przetwarzanie, inaczej zdrowe zadania będą się dublować w locie.</li>' +
            '<li><strong>DLQ z alertem</strong> po 3-5 próbach; dashboard z wiekiem najstarszej wiadomości (oldest message age) - to metryka zaległości uczciwsza niż sama głębokość.</li>' +
            '</ul>' +
            '<h4>Zdarzenia w aplikacjach LLM</h4>' +
            '<p>Wzorce, które będziesz wdrażać wprost: <strong>(1) długie generacje</strong> - żądanie "przeanalizuj 200 umów" wpada do kolejki, workerzy wołają Claude API równolegle z kontrolą limitów (rate limits), wyniki lądują w bazie, frontend dostaje status przez SSE/polling. <strong>(2) Batch API</strong> Anthropic (znasz z lekcji o ekonomii żądań) to w istocie zarządzana kolejka po stronie dostawcy - 50% taniej za zgodę na asynchroniczność. <strong>(3) Indeksowanie RAG</strong> - każdy nowy/zmieniony dokument to zdarzenie; pipeline embeddingów jest konsumentem. <strong>(4) Webhooki</strong> od dostawców (Stripe, GitHub): endpoint przyjmuje POST, waliduje podpis, wrzuca do własnej kolejki i odpowiada 200 w milisekundach - przetwarzanie nigdy nie blokuje odbioru.</p>' +
            '<p>Pułapka na koniec: <strong>spójność ostateczna dotyczy też UX</strong>. Skoro indeksowanie jest asynchroniczne, użytkownik może zadać pytanie o dokument, którego embeddingi jeszcze nie istnieją. To problem produktowy, nie tylko techniczny: pokazuj status ("indeksowanie: 3/500..."), zarządzaj oczekiwaniem - dokładnie te wzorce, które znasz z modułu o UX streamingu.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Każda operacja wolniejsza niż ~2-5 s w aplikacji AI powinna przejść przez kolejkę, z DLQ i idempotentnym handlerem jako niedyskutowalnym minimum.</li>' +
            '<li>Skaluj workerów po głębokości kolejki i wieku najstarszej wiadomości - to najuczciwsze metryki zaległości.</li>' +
            '<li>Na rozmowie: rozróżnij kolejkę od pub/sub i od loga (Kafka), wyjaśnij, czemu exactly-once robi się w aplikacji, i miej gotowy przykład idempotentnego handlera.</li>' +
            '</ul>',
          en: '<p>Production event-driven architecture starts with a conscious choice of guarantees. <strong>At-least-once</strong> is the standard (SQS standard - a message may arrive again); <strong>exactly-once</strong> does not, in general, exist at the transport level - you achieve it AT THE APPLICATION LEVEL: an idempotency key in the database (a unique index on message_id) plus operations safe to repeat. <strong>FIFO</strong> queues add ordering and deduplication within a group at the cost of throughput - used where ordering is hard law (ledger entries), not everywhere "just in case".</p>' +
            '<p>The second decision: <strong>queue or log</strong>. SQS/RabbitMQ are queues: a consumed message disappears. <strong>Kafka</strong> is a durable event log: records stay for days or years, consumers keep their own pointers (offsets) and can read from any position - hence replaying history for a new consumer or after a bug. Kafka also gives per-partition ordering and huge throughput, but operationally it is another league. Rule of thumb: start with a managed queue (SQS: the first million messages a month free, then ~0.40-0.50 USD per million); reach for Kafka when you need replay, many independent consumers of the same history, or analytical streams.</p>' +
            '<h4>The craft of retries</h4>' +
            '<ul>' +
            '<li><strong>Exponential backoff with jitter</strong> (growing delays plus randomness): retry at 1 s, 2 s, 4 s... with spread, so a thousand messages do not return in the same second (the thundering herd).</li>' +
            '<li><strong>Visibility timeout</strong> (SQS): a message taken by a worker is invisible for X seconds; if the worker dies, it returns to the queue. Set X longer than your slowest processing, or healthy jobs will duplicate mid-flight.</li>' +
            '<li><strong>DLQ with an alert</strong> after 3-5 attempts; a dashboard with oldest message age - a more honest backlog metric than depth alone.</li>' +
            '</ul>' +
            '<h4>Events in LLM applications</h4>' +
            '<p>Patterns you will implement directly: <strong>(1) long generations</strong> - a request to "analyze 200 contracts" drops into a queue, workers call the Claude API in parallel under rate-limit control, results land in the database, the frontend gets status via SSE/polling. <strong>(2) The Anthropic Batch API</strong> (known from the request-economics lesson) is essentially a managed queue on the provider side - 50% cheaper in exchange for accepting asynchrony. <strong>(3) RAG indexing</strong> - every new or changed document is an event; the embedding pipeline is a consumer. <strong>(4) Webhooks</strong> from vendors (Stripe, GitHub): the endpoint accepts the POST, validates the signature, drops it onto your own queue and returns 200 within milliseconds - processing never blocks reception.</p>' +
            '<p>A final trap: <strong>eventual consistency is also UX</strong>. Since indexing is asynchronous, a user can ask about a document whose embeddings do not exist yet. That is a product problem, not just a technical one: show status ("indexing: 3/500..."), manage expectations - exactly the patterns you know from the streaming UX module.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Any operation slower than ~2-5 s in an AI app should go through a queue, with a DLQ and an idempotent handler as the non-negotiable minimum.</li>' +
            '<li>Scale workers on queue depth and oldest-message age - the honest backlog metrics.</li>' +
            '<li>In interviews: distinguish queue from pub/sub from log (Kafka), explain why exactly-once is built in the application, and have an idempotent-handler example ready.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co daje wstawienie kolejki między dwie usługi?',
            en: 'What does putting a queue between two services buy you?'
          },
          options: [
            { pl: 'Rozprzęgnięcie w czasie: nadawca nie czeka na odbiorcę i przeżywa jego awarię, a nagły szczyt zadań buforuje się w kolejce zamiast zabijać odbiorcę', en: 'Decoupling in time: the sender does not wait for the receiver and survives its downtime, and a sudden burst of jobs buffers in the queue instead of killing the receiver' },
            { pl: 'Przyspieszenie każdego pojedynczego zadania', en: 'Making every single job faster' },
            { pl: 'Gwarancję, że zadania wykonają się dokładnie raz, bez duplikatów', en: 'A guarantee that jobs run exactly once, with no duplicates' },
            { pl: 'Automatyczne szyfrowanie wiadomości', en: 'Automatic message encryption' }
          ],
          correct: 0,
          explain: {
            pl: 'Kolejka to bufor: producent wrzuca i idzie dalej, konsument nadrabia we własnym tempie. Pojedyncze zadanie kończy się później niż synchronicznie - zyskiem jest odporność systemu, nie szybkość jednostki.',
            en: 'A queue is a buffer: the producer drops and moves on, the consumer catches up at its own pace. A single job finishes later than it would synchronously - the gain is system resilience, not unit speed.'
          }
        },
        {
          q: {
            pl: 'Czym różni się kolejka robocza od pub/sub?',
            en: 'How does a work queue differ from pub/sub?'
          },
          options: [
            { pl: 'Kolejka jest szybsza, pub/sub bezpieczniejszy', en: 'A queue is faster, pub/sub is safer' },
            { pl: 'Pub/sub działa tylko w Kafce', en: 'Pub/sub only works in Kafka' },
            { pl: 'W kolejce każdą wiadomość przetwarza JEDEN worker (rozdzielanie pracy); w pub/sub każdy subskrybent dostaje WŁASNĄ kopię zdarzenia (rozgłaszanie faktu)', en: 'In a queue each message is processed by ONE worker (work distribution); in pub/sub every subscriber gets its OWN copy of the event (broadcasting a fact)' },
            { pl: 'Kolejka przechowuje dane trwale, pub/sub tylko w pamięci', en: 'A queue stores data durably, pub/sub only in memory' }
          ],
          correct: 2,
          explain: {
            pl: 'To rozróżnienie intencji: kolejka mówi "niech ktoś to zrobi", pub/sub mówi "stało się X - kogo to obchodzi, niech reaguje". Nadawca zdarzenia nie zna i nie musi znać swoich subskrybentów.',
            en: 'It is a distinction of intent: a queue says "someone do this", pub/sub says "X happened - whoever cares, react". The event publisher neither knows nor needs to know its subscribers.'
          }
        },
        {
          q: {
            pl: 'Kolejka gwarantuje dostarczenie at-least-once. Co z tego wynika dla kodu workera?',
            en: 'A queue guarantees at-least-once delivery. What follows for the worker code?'
          },
          options: [
            { pl: 'Nic - kolejka sama pilnuje unikalności', en: 'Nothing - the queue polices uniqueness itself' },
            { pl: 'Worker musi przetwarzać wiadomości w kolejności nadania', en: 'The worker must process messages in send order' },
            { pl: 'Worker powinien odrzucać wiadomości starsze niż minuta', en: 'The worker should reject messages older than a minute' },
            { pl: 'Ta sama wiadomość może przyjść więcej niż raz, więc handler musi być idempotentny - powtórne wykonanie nie może zepsuć danych (np. klucz idempotencji sprawdzany przed robotą)', en: 'The same message may arrive more than once, so the handler must be idempotent - a repeat run must not corrupt data (e.g. an idempotency key checked before doing the work)' }
          ],
          correct: 3,
          explain: {
            pl: 'At-least-once znaczy: na pewno dotrze, czasem podwójnie (np. worker padł po robocie, a przed potwierdzeniem). Idempotencja to obowiązkowa para tej gwarancji - dokładnie ta sama zasada, co przy powtarzalnych krokach agenta.',
            en: 'At-least-once means: it will arrive, occasionally twice (e.g. the worker died after the work but before the ack). Idempotency is the mandatory partner of that guarantee - the same principle as with retryable agent steps.'
          }
        },
        {
          q: {
            pl: 'Nocny proces indeksuje 50 tysięcy dokumentów, wołając synchronicznie endpoint embeddingów w pętli. Przy dokumencie 31 tysięcy proces pada i wszystko leci od nowa. Jak to się robi porządnie?',
            en: 'A nightly process indexes 50 thousand documents by synchronously calling an embeddings endpoint in a loop. At document 31 thousand the process dies and everything restarts from scratch. What is the proper design?'
          },
          options: [
            { pl: 'Dodać try/catch i logować błędy, ale zostawić pętlę', en: 'Add try/catch and log errors, but keep the loop' },
            { pl: 'Wrzucić 50 tysięcy zadań do kolejki: workerzy przetwarzają równolegle i wznawiają od miejsca awarii, nieudane dokumenty po kilku próbach lądują w DLQ zamiast wywracać całość', en: 'Drop 50 thousand jobs onto a queue: workers process in parallel and resume from where failure struck, and documents that keep failing land in a DLQ after a few attempts instead of toppling the whole run' },
            { pl: 'Uruchomić proces na większej maszynie, żeby zdążył przed awarią', en: 'Run the process on a bigger machine so it finishes before it can fail' },
            { pl: 'Podzielić pętlę na 5 mniejszych pętli po 10 tysięcy dokumentów', en: 'Split the loop into 5 smaller loops of 10 thousand documents' }
          ],
          correct: 1,
          explain: {
            pl: 'Kolejka zamienia krucho-monolityczny przebieg w strumień małych, wznawialnych, równoległych zadań: awaria workera cofa jedną wiadomość, nie 31 tysięcy. Do tego DLQ izoluje zepsute dokumenty. To kanoniczny wzorzec ciężkich potoków AI - batch embeddingów, ewaluacji, analiz.',
            en: 'A queue turns a brittle monolithic run into a stream of small, resumable, parallel jobs: a worker crash rolls back one message, not 31 thousand. The DLQ isolates broken documents on top. This is the canonical pattern of heavy AI pipelines - batch embeddings, evals, analyses.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 8
    {
      id: 'cicd-deployment',
      title: {
        pl: 'CI/CD: droga kodu na produkcję',
        en: 'CI/CD: the road to production'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'CI (continuous integration)', en: 'CI (continuous integration)' },
          def: {
            pl: 'Ciągła integracja: każdy push do repozytorium automatycznie odpala build, lint i testy. Problemy wychodzą w minuty po powstaniu, a nie w dniu wydania - main ma być zawsze zielony.',
            en: 'Continuous integration: every push to the repo automatically triggers build, lint and tests. Problems surface minutes after they are created, not on release day - main stays green at all times.'
          }
        },
        {
          term: { pl: 'CD (delivery vs deployment)', en: 'CD (delivery vs deployment)' },
          def: {
            pl: 'Dwa rozwinięcia skrótu: continuous delivery - każda zielona wersja jest GOTOWA do wydania, ale na produkcję wypuszcza ją człowiek; continuous deployment - zielona wersja idzie na produkcję w pełni automatycznie, bez ręcznej bramki.',
            en: 'Two expansions of the acronym: continuous delivery - every green build is READY to release, but a human pushes it to production; continuous deployment - a green build goes to production fully automatically, with no manual gate.'
          }
        },
        {
          term: { pl: 'pipeline', en: 'pipeline' },
          def: {
            pl: 'Zautomatyzowana taśma etapów, przez którą przechodzi każda zmiana: build, testy, budowa obrazu, wdrożenia na kolejne środowiska. Czerwony etap zatrzymuje taśmę - wadliwa zmiana nie jedzie dalej.',
            en: 'The automated conveyor of stages every change passes through: build, tests, image build, deployments to successive environments. A red stage stops the belt - a faulty change travels no further.'
          }
        },
        {
          term: { pl: 'środowisko (dev / staging / prod)', en: 'environment (dev / staging / prod)' },
          def: {
            pl: 'Osobne, kompletne instancje systemu: dev do zabawy, staging jako przedsionek maksymalnie podobny do produkcji, prod dla prawdziwych użytkowników. Ta sama wersja artefaktu wędruje przez nie po kolei.',
            en: 'Separate, complete instances of the system: dev for play, staging as the antechamber kept maximally production-like, prod for real users. The same artifact version travels through them in order.'
          }
        },
        {
          term: { pl: 'artefakt', en: 'artifact' },
          def: {
            pl: 'Zbudowany, niezmienny produkt pipeline (w chmurze zwykle obraz kontenera z konkretnym tagiem). Buduje się go RAZ, a potem ten sam artefakt promuje przez staging na produkcję - bez przebudowywania po drodze.',
            en: 'The built, immutable product of a pipeline (in the cloud usually a container image with a concrete tag). It is built ONCE and the same artifact is promoted through staging to production - never rebuilt along the way.'
          }
        },
        {
          term: { pl: 'canary release', en: 'canary release' },
          def: {
            pl: 'Wydanie kanarkowe: nowa wersja dostaje najpierw mały procent ruchu (np. 5%), a automat porównuje jej metryki (błędy, latencję) ze starą. Dobre metryki - stopniowo 100%; złe - automatyczny odwrót. Nazwa od kanarka w kopalni.',
            en: 'A canary release: the new version first gets a small slice of traffic (e.g. 5%) while an automat compares its metrics (errors, latency) against the old one. Good metrics - gradually 100%; bad - automatic retreat. Named after the canary in the coal mine.'
          }
        },
        {
          term: { pl: 'blue/green deployment', en: 'blue/green deployment' },
          def: {
            pl: 'Dwa kompletne środowiska produkcyjne: niebieskie (obecna wersja) i zielone (nowa). Przełączenie ruchu jest jednym ruchem routera - i tak samo natychmiastowy jest powrót. Cena: przez moment utrzymujesz podwójną infrastrukturę.',
            en: 'Two complete production environments: blue (current version) and green (new). Switching traffic is a single router move - and the way back is just as instant. The price: you briefly run double infrastructure.'
          }
        },
        {
          term: { pl: 'rollback', en: 'rollback' },
          def: {
            pl: 'Powrót do poprzedniej, znanej dobrej wersji po nieudanym wdrożeniu. Tani i szybki, jeśli artefakty są wersjonowane i niezmienne: wdrażasz po prostu poprzedni tag obrazu. Czas rollbacku to miara dojrzałości zespołu.',
            en: 'Returning to the previous known-good version after a bad deploy. Cheap and fast when artifacts are versioned and immutable: you simply deploy the previous image tag. Rollback time is a maturity metric of a team.'
          }
        },
        {
          term: { pl: 'feature flag', en: 'feature flag' },
          def: {
            pl: 'Przełącznik w kodzie, który włącza funkcję niezależnie od wdrożenia: kod może jechać na produkcję wyłączony i zostać włączony (np. dla 10% użytkowników) jednym kliknięciem - bez nowego deployu. Rozdziela "wdrożenie" od "wydania".',
            en: 'A switch in code that enables a feature independently of deployment: code can ship to production turned off and be enabled (e.g. for 10% of users) with one click - no new deploy. It separates "deploy" from "release".'
          }
        },
        {
          term: { pl: 'smoke test', en: 'smoke test' },
          def: {
            pl: 'Minimalny test dymny odpalany zaraz po wdrożeniu na środowisko: czy aplikacja wstaje, odpowiada na /health i wykonuje jedną kluczową operację. Nie zastępuje testów - sprawdza tylko, czy nic się nie "kopci", zanim pojedzie dalej.',
            en: 'A minimal test run right after deploying to an environment: does the app start, answer /health and perform one key operation. It does not replace tests - it only checks nothing is smoking before the change travels on.'
          }
        },
        {
          term: { pl: 'IaC / Terraform', en: 'IaC / Terraform' },
          def: {
            pl: 'Infrastructure as Code: infrastruktura (VM-ki, kolejki, uprawnienia) opisana w plikach i wdrażana narzędziem typu Terraform, które porównuje opis ze stanem faktycznym i pokazuje plan zmian. Infrastruktura przechodzi przez code review jak każdy inny kod.',
            en: 'Infrastructure as Code: infrastructure (VMs, queues, permissions) described in files and applied by a tool like Terraform, which diffs the description against reality and shows a change plan. Infrastructure goes through code review like any other code.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m9c8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="30" width="120" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="80" y="53" text-anchor="middle" font-size="13" fill="var(--text)">git push</text>' +
          '<text x="80" y="72" text-anchor="middle" font-size="11" fill="var(--muted)">to main / PR</text>' +
          '<line x1="140" y1="57" x2="185" y2="57" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c8)"/>' +
          '<rect x="190" y="30" width="150" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="265" y="53" text-anchor="middle" font-size="13" fill="var(--text)">CI: build + tests</text>' +
          '<text x="265" y="72" text-anchor="middle" font-size="11" fill="var(--muted)">lint, unit, evals</text>' +
          '<line x1="340" y1="57" x2="385" y2="57" stroke="var(--accent)" stroke-width="2" marker-end="url(#m9c8)"/>' +
          '<rect x="390" y="30" width="140" height="54" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="460" y="53" text-anchor="middle" font-size="13" fill="var(--text)">image myapp:1.5</text>' +
          '<text x="460" y="72" text-anchor="middle" font-size="11" fill="var(--muted)">-> registry</text>' +
          '<line x1="460" y1="84" x2="460" y2="126" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m9c8)"/>' +
          '<rect x="390" y="130" width="140" height="54" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="460" y="153" text-anchor="middle" font-size="13" fill="var(--text)">staging</text>' +
          '<text x="460" y="172" text-anchor="middle" font-size="11" fill="var(--muted)">auto deploy + smoke</text>' +
          '<line x1="390" y1="157" x2="240" y2="157" stroke="var(--warn)" stroke-width="2" marker-end="url(#m9c8)"/>' +
          '<rect x="90" y="130" width="150" height="54" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="165" y="153" text-anchor="middle" font-size="13" fill="var(--text)">canary 5%</text>' +
          '<text x="165" y="172" text-anchor="middle" font-size="11" fill="var(--muted)">watch errors, p95</text>' +
          '<line x1="165" y1="184" x2="165" y2="226" stroke="var(--ok)" stroke-width="2" marker-end="url(#m9c8)"/>' +
          '<rect x="90" y="230" width="150" height="54" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="165" y="253" text-anchor="middle" font-size="13" fill="var(--text)">production 100%</text>' +
          '<text x="165" y="272" text-anchor="middle" font-size="11" fill="var(--muted)">same artifact</text>' +
          '<line x1="330" y1="255" x2="240" y2="255" stroke="var(--err)" stroke-width="2" marker-end="url(#m9c8)" stroke-dasharray="6 5"/>' +
          '<rect x="335" y="230" width="195" height="54" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="432" y="253" text-anchor="middle" font-size="13" fill="var(--text)">rollback</text>' +
          '<text x="432" y="272" text-anchor="middle" font-size="11" fill="var(--muted)">deploy previous tag</text>' +
          '<rect x="20" y="320" width="600" height="96" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="350" text-anchor="middle" font-size="15" fill="var(--text)">Red stage = the belt stops; broken code never travels further</text>' +
          '<text x="320" y="376" text-anchor="middle" font-size="13" fill="var(--muted)">build once, promote the SAME image through every environment,</text>' +
          '<text x="320" y="398" text-anchor="middle" font-size="13" fill="var(--muted)">and keep the previous tag one command away</text>' +
          '</svg>',
        caption: {
          pl: 'Kanoniczny pipeline: push odpala build i testy, obraz idzie do rejestru, potem przez staging i kanarka na produkcję - z rollbackiem w odwodzie.',
          en: 'The canonical pipeline: a push triggers build and tests, the image goes to the registry, then through staging and a canary to production - with rollback on standby.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Dwa przebiegi pipeline: commit z bugiem, którego taśma nie przepuszcza, i poprawka, która przez kanarka dojeżdża do 100% ruchu.',
            en: 'Two pipeline runs: a buggy commit the belt refuses to pass, and a fix that rides through the canary to 100% of traffic.'
          },
          frames: [
            {
              svg: plFrame('commit a1f9: "switch prompt to v2"', 'var(--text)',
                plStage(0, 'build', 'running...', 'var(--accent)', 1) +
                plStage(1, 'tests + evals', 'queued', 'var(--border)', 0.6) +
                plStage(2, 'staging', 'queued', 'var(--border)', 0.6) +
                plStage(3, 'canary 5%', 'queued', 'var(--border)', 0.6) +
                plStage(4, 'prod 100%', 'queued', 'var(--border)', 0.6),
                'A push starts the belt', 'Nobody asked for a deploy - every change takes the same road automatically.',
                'The pipeline is the only road to production. No side doors.', 'var(--accent)'),
              label: { pl: '1. Push odpala taśmę', en: '1. A push starts the belt' },
              note: {
                pl: 'Każdy push przechodzi identyczną drogę - automatycznie. To usuwa całą klasę wpadek "wgrałem na serwer z laptopa i zapomniałem o testach".',
                en: 'Every push takes the identical road - automatically. That deletes the whole class of "uploaded from my laptop and forgot the tests" accidents.'
              }
            },
            {
              svg: plFrame('commit a1f9: "switch prompt to v2"', 'var(--text)',
                plStage(0, 'build', 'passed', 'var(--ok)', 1) +
                plStage(1, 'tests + evals', 'FAILED: eval 71%', 'var(--err)', 1) +
                plStage(2, 'staging', 'skipped', 'var(--border)', 0.4) +
                plStage(3, 'canary 5%', 'skipped', 'var(--border)', 0.4) +
                plStage(4, 'prod 100%', 'skipped', 'var(--border)', 0.4),
                'The eval gate catches a regression', 'The new prompt scores 71% on the golden set; the gate requires 85%.',
                'Production never saw this change. The gate earned its keep.', 'var(--err)'),
              label: { pl: '2. Czerwona bramka', en: '2. A red gate' },
              note: {
                pl: 'W aplikacji AI bramką w CI są też evale (znasz z modułu 5): nowy prompt zawalił golden set, więc taśma staje. Użytkownicy nigdy nie zobaczyli regresji - o to chodzi w całym CI/CD.',
                en: 'In an AI app the CI gates include evals (module 5): the new prompt failed the golden set, so the belt stops. Users never saw the regression - which is the entire point of CI/CD.'
              }
            },
            {
              svg: plFrame('commit b2c4: "prompt v2 + fixed few-shot examples"', 'var(--text)',
                plStage(0, 'build', 'passed', 'var(--ok)', 1) +
                plStage(1, 'tests + evals', 'passed: 91%', 'var(--ok)', 1) +
                plStage(2, 'staging', 'deployed + smoke ok', 'var(--ok)', 1) +
                plStage(3, 'canary 5%', 'starting...', 'var(--accent)', 1) +
                plStage(4, 'prod 100%', 'waiting', 'var(--border)', 0.6),
                'The fix rides through to the canary', 'The same image that passed tests is promoted - never rebuilt.',
                'Now 5% of real traffic hits the new version.', 'var(--ok)'),
              label: { pl: '3. Zielony przejazd', en: '3. A green run' },
              note: {
                pl: 'Poprawiony commit przechodzi bramki i JEDEN raz zbudowany obraz jedzie dalej przez środowiska. Staging dostaje go automatycznie, a potem zaczyna się najciekawsze: kanarek.',
                en: 'The fixed commit passes the gates and the once-built image travels on through the environments. Staging gets it automatically, and then the best part starts: the canary.'
              }
            },
            {
              svg: plFrame('canary: v2 at 5% - errors 0.2% vs 0.2%, p95 equal', 'var(--ok)',
                plStage(0, 'build', 'passed', 'var(--ok)', 1) +
                plStage(1, 'tests + evals', 'passed: 91%', 'var(--ok)', 1) +
                plStage(2, 'staging', 'ok', 'var(--ok)', 1) +
                plStage(3, 'canary 5%', 'metrics healthy', 'var(--ok)', 1) +
                plStage(4, 'prod 100%', 'rolling out...', 'var(--accent)', 1),
                'The canary sings, so traffic shifts', 'New and old version run side by side; an automat compares their metrics.',
                'Bad metrics would shift traffic BACK automatically - that is the whole trick.', 'var(--ok)'),
              label: { pl: '4. Kanarek śpiewa', en: '4. The canary sings' },
              note: {
                pl: 'Przez kwadrans nowa wersja obsługuje 5% ruchu, a automat porównuje błędy i latencję ze starą. Gdyby metryki siadły, ruch wróciłby do starej wersji bez udziału człowieka.',
                en: 'For a quarter of an hour the new version serves 5% of traffic while an automat compares errors and latency against the old one. Had the metrics dipped, traffic would return to the old version without a human.'
              }
            },
            {
              svg: plFrame('v2 at 100% - previous tag ready for instant rollback', 'var(--ok)',
                plStage(0, 'build', 'passed', 'var(--ok)', 1) +
                plStage(1, 'tests + evals', 'passed: 91%', 'var(--ok)', 1) +
                plStage(2, 'staging', 'ok', 'var(--ok)', 1) +
                plStage(3, 'canary 5%', 'ok', 'var(--ok)', 1) +
                plStage(4, 'prod 100%', 'LIVE', 'var(--ok)', 1),
                'Deployed - and reversible', 'From push to full production: ~25 minutes, zero manual steps.',
                'Rollback = deploy the previous image tag. One command, two minutes.', 'var(--ok)'),
              label: { pl: '5. Produkcja i odwrót w odwodzie', en: '5. Live, with a way back' },
              note: {
                pl: 'Wdrożenie to nie skok bez spadochronu: poprzedni tag obrazu czeka w rejestrze, więc odwrót to jedno polecenie. Zespoły, które wdrażają często i mają szybki rollback, śpią najlepiej - i to właśnie mierzą metryki DORA.',
                en: 'A deploy is not a jump without a parachute: the previous image tag waits in the registry, so retreat is one command. Teams that deploy often and roll back fast sleep best - which is exactly what the DORA metrics measure.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Fabryka samochodów ma taśmę z punktami kontroli: po silniku sprawdzają silnik, po hamulcach hamulce, na końcu jest jazda próbna. Jak cokolwiek nie przejdzie kontroli, taśma staje i wadliwe auto NIE jedzie do salonu. Nikt nie dyskutuje: "może tym razem bez sprawdzania hamulców, bo się spieszymy".</p>' +
            '<p><strong>CI/CD to taka taśma dla kodu.</strong> Za każdym razem, gdy odkładasz zmianę do wspólnej szafy (git push), automat ją buduje i przepuszcza przez wszystkie kontrole: czy się kompiluje, czy testy przechodzą, czy nic starego się nie zepsuło. Czerwona lampka? Taśma staje, zmiana nie jedzie dalej, a ty dostajesz znać w pięć minut - a nie w dniu premiery.</p>' +
            '<p>Dalej jest jeszcze sprytniej. Zanim nowa wersja trafi do wszystkich, dostaje ją garstka klientów - jak nowy model auta, który najpierw testuje kilku zaufanych kierowców. To się nazywa <strong>kanarek</strong>, od kanarka w kopalni: mały ptaszek pierwszy wyczuwał zły gaz. Jak garstka kierowców nie zgłasza problemów, nową wersję dostają wszyscy. Jak zgłasza - wracamy do starej jednym ruchem.</p>' +
            '<p>Najlepsze na koniec: ta aplikacja, w której właśnie czytasz te słowa, jedzie dokładnie taką taśmą. Każda zmiana wypchnięta do repozytorium sama buduje się i publikuje w internecie. Zero ręcznego wgrywania - taśma robi wszystko.</p>',
          en: '<p>A car factory has an assembly line with checkpoints: after the engine they test the engine, after the brakes the brakes, at the end comes a test drive. If anything fails a check, the line stops and the faulty car does NOT go to the showroom. Nobody argues: "maybe skip the brake check this once, we are in a hurry".</p>' +
            '<p><strong>CI/CD is that line for code.</strong> Every time you put a change into the shared cabinet (git push), an automat builds it and runs it through all the checks: does it compile, do the tests pass, did anything old break. A red light? The line stops, the change travels no further, and you find out within five minutes - not on launch day.</p>' +
            '<p>Further down it gets cleverer. Before a new version reaches everyone, a handful of customers get it first - like a new car model tested by a few trusted drivers. This is called a <strong>canary</strong>, after the canary in the coal mine: the little bird sensed bad gas first. If the handful reports no problems, everyone gets the new version. If it does - back to the old one in a single move.</p>' +
            '<p>The best part comes last: the app you are reading these words in rides exactly such a line. Every change pushed to the repository builds and publishes itself to the internet. Zero manual uploading - the belt does everything.</p>'
        },
        school: {
          pl: '<p><strong>CI</strong> (continuous integration, ciągła integracja) to zasada: każdy push automatycznie odpala build, lint i testy. Cel jest psychologiczny i praktyczny naraz: błąd wykryty 5 minut po napisaniu kosztuje 5 minut; ten sam błąd znaleziony po dwóch tygodniach na produkcji kosztuje dzień śledztwa. <strong>CD</strong> ma dwa znaczenia, o które lubią pytać: <strong>continuous delivery</strong> - każda zielona wersja jest gotowa do wydania, ale przycisk naciska człowiek; <strong>continuous deployment</strong> - zielona wersja jedzie na produkcję sama, bez pytania.</p>' +
            '<p>Fizycznie CI/CD to <strong>pipeline</strong>: sekwencja etapów uruchamiana przez push. Typowy kształt dla aplikacji w kontenerze: build i testy, budowa obrazu Dockera (artefakt z lekcji 3), push do rejestru, automatyczny deploy na <strong>staging</strong> (środowisko-przedsionek, możliwie identyczne z produkcją), a po bramce - produkcja. Kluczowa zasada: <strong>artefakt buduje się RAZ</strong> i ten sam obraz wędruje przez wszystkie środowiska; różni je tylko konfiguracja (zmienne środowiskowe).</p>' +
            '<h4>Worked example: pipeline, który znasz z tego repo</h4>' +
            '<p>Ta aplikacja ma plik <code>.github/workflows/deploy-pages.yml</code> - definicję pipeline dla <strong>GitHub Actions</strong> (wbudowanego CI/CD GitHuba). Uproszczony szkielet takiego pliku:</p>' +
            '<pre><code>on:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n  deploy:\n    needs: test\n    steps:\n      - run: ./deploy.sh</code></pre>' +
            '<p>Czytasz to tak: na push do main uruchom job "test" na świeżej maszynie ubuntu; job "deploy" startuje TYLKO gdy test przejdzie (<code>needs: test</code>). Właśnie napisałeś bramkę jakości. Sekrety (klucze API, hasła) nie mieszkają w repo, tylko w magazynie sekretów CI i są wstrzykiwane w czasie wykonania.</p>' +
            '<h4>Strategie wdrożenia - jak nie wdrażać "na hurra"</h4>' +
            '<ul>' +
            '<li><strong>Rolling update</strong>: podmiana instancji po kolei (znasz z lekcji o K8s) - domyślna, bez podwójnych kosztów.</li>' +
            '<li><strong>Blue/green</strong>: dwa pełne środowiska, przełączenie ruchu jednym ruchem - natychmiastowy rollback, ale przez chwilę płacisz podwójnie.</li>' +
            '<li><strong>Canary</strong>: nowa wersja dostaje 5% ruchu pod obserwacją metryk, potem stopniowo więcej - najbezpieczniejsza, wymaga dobrego monitoringu.</li>' +
            '</ul>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>CI = automatyczny build i testy po każdym pushu; CD = automatyczna droga zielonych wersji przez środowiska (z ręczną bramką albo bez). Pipeline jest jedyną drogą na produkcję, artefakt buduje się raz, a wdrożenie ma zawsze plan odwrotu: poprzedni tag obrazu i strategię typu canary.</p>',
          en: '<p><strong>CI</strong> (continuous integration) is the rule: every push automatically triggers build, lint and tests. The goal is psychological and practical at once: a bug caught 5 minutes after writing costs 5 minutes; the same bug found two weeks later in production costs a day of forensics. <strong>CD</strong> has two meanings interviewers love to probe: <strong>continuous delivery</strong> - every green build is ready to ship, but a human presses the button; <strong>continuous deployment</strong> - a green build rides to production on its own, no questions asked.</p>' +
            '<p>Physically CI/CD is a <strong>pipeline</strong>: a sequence of stages triggered by a push. The typical shape for a containerized app: build and tests, Docker image build (the artifact from lesson 3), push to the registry, automatic deploy to <strong>staging</strong> (the antechamber environment, kept as production-like as possible), and past a gate - production. The key rule: <strong>the artifact is built ONCE</strong> and the same image travels through all environments; only configuration (environment variables) differs between them.</p>' +
            '<h4>Worked example: the pipeline you know from this repo</h4>' +
            '<p>This very app has a file <code>.github/workflows/deploy-pages.yml</code> - a pipeline definition for <strong>GitHub Actions</strong> (the CI/CD built into GitHub). A simplified skeleton of such a file:</p>' +
            '<pre><code>on:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n  deploy:\n    needs: test\n    steps:\n      - run: ./deploy.sh</code></pre>' +
            '<p>You read it as: on a push to main, run the "test" job on a fresh ubuntu machine; the "deploy" job starts ONLY if test passes (<code>needs: test</code>). You just wrote a quality gate. Secrets (API keys, passwords) do not live in the repo but in the CI secret store, injected at runtime.</p>' +
            '<h4>Deployment strategies - how not to ship on a war cry</h4>' +
            '<ul>' +
            '<li><strong>Rolling update</strong>: swap instances one by one (known from the K8s lesson) - the default, no double costs.</li>' +
            '<li><strong>Blue/green</strong>: two full environments, traffic switched in one move - instant rollback, but you briefly pay double.</li>' +
            '<li><strong>Canary</strong>: the new version gets 5% of traffic under metric watch, then gradually more - the safest, needs good monitoring.</li>' +
            '</ul>' +
            '<h4>What you must remember</h4>' +
            '<p>CI = automatic build and tests on every push; CD = the automatic road of green builds through environments (with or without a manual gate). The pipeline is the only road to production, the artifact is built once, and a deploy always carries a retreat plan: the previous image tag and a strategy like canary.</p>'
        },
        pro: {
          pl: '<p>Dojrzałość CI/CD mierzy się czterema metrykami <strong>DORA</strong> (DevOps Research and Assessment - wieloletnie badanie tysięcy zespołów): częstość wdrożeń, czas od commita do produkcji (lead time), odsetek wdrożeń powodujących awarię (change failure rate) i czas przywrócenia po awarii (MTTR). Wnioski z badań są antyintuicyjne dla managementu i warte cytowania: zespoły wdrażające CZĘŚCIEJ mają NIŻSZY odsetek awarii - bo małe zmiany są łatwe do zrozumienia i cofnięcia. Strach przed wdrożeniami jest wskaźnikiem problemu, nie ostrożności.</p>' +
            '<h4>Rzemiosło pipeline</h4>' +
            '<ul>' +
            '<li><strong>Czas przejazdu poniżej 10-15 minut</strong> - powyżej ludzie przestają czekać na wynik i zaczynają obchodzić proces. Cache zależności i warstw Dockera (lekcja 3) to główna dźwignia.</li>' +
            '<li><strong>Ochrona gałęzi main</strong>: wejście tylko przez PR z zielonym CI i review. Pipeline jest jedyną drogą na produkcję - konto deployujące z laptopa to czerwona flaga audytu.</li>' +
            '<li><strong>Rollback ćwiczony, nie teoretyczny</strong>: niezmienne, wersjonowane artefakty czynią go jednym poleceniem. Osobna sprawa: migracje bazy muszą być kompatybilne wstecz (expand-contract), inaczej rollback kodu nie cofnie schematu.</li>' +
            '<li><strong>Feature flags</strong> rozdzielają wdrożenie od wydania: kod jedzie wyłączony, włączasz go dla 1%, 10%, 100% użytkowników bez deployu. To także mechanizm eksperymentów A/B - i wyłącznik awaryjny, gdy funkcja zawiedzie.</li>' +
            '</ul>' +
            '<h4>Infrastruktura jako kod</h4>' +
            '<p>Skoro aplikacja ma pipeline, infrastruktura też powinna. <strong>Terraform</strong> (najpopularniejsze narzędzie IaC) opisuje zasoby deklaratywnie w plikach .tf: <code>terraform plan</code> pokazuje diff między opisem a rzeczywistością, <code>terraform apply</code> go domyka - rozpoznajesz wzorzec? To znowu rekoncyliacja stanu pożądanego, jak w K8s i React. Efekt: zmiana infrastruktury (nowa kolejka, nowy bucket, uprawnienie IAM) przechodzi przez PR i review jak każdy kod, a środowisko staging odtwarza się z tych samych plików co produkcja. Klikanie w konsoli zostaje do podglądania.</p>' +
            '<h4>CI/CD dla aplikacji AI - twoja specjalizacja</h4>' +
            '<p>Wszystko powyżej plus warstwa, którą znasz z modułu o evalach, tu spięta w całość: <strong>eval suite jako bramka</strong> - zmiana promptu, modelu czy parametrów RAG przechodzi przez golden set (np. Promptfoo w jobie CI) i blokuje merge poniżej progu; <strong>canary dla promptów i modeli</strong> - nowy model dostaje 5% ruchu z porównaniem metryk jakości i kosztów, dokładnie jak canary kodu; <strong>flagi na modele</strong> - przełącznik dostawcy/wersji modelu jako feature flag daje odwrót w sekundę, gdy nowy model zacznie halucynować na produkcji. W ogłoszeniach o pracę AI Engineera "integracja z CI/CD" znaczy dokładnie to: umiesz wpiąć jakość modelu w taśmę wdrożeniową.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Jeden pipeline, jedna droga na produkcję, artefakt budowany raz - wszystko inne to konfiguracja per środowisko.</li>' +
            '<li>Inwestuj w czas przejazdu i rollback zanim urośnie ruch; DORA mierzy dokładnie to, co czuć na dyżurze.</li>' +
            '<li>Na rozmowie: rozróżnij delivery od deployment, opisz canary z automatycznym odwrotem i miej przykład bramki evalowej dla zmiany promptu - to odpowiedź, która skleja cały ten moduł z resztą kursu.</li>' +
            '</ul>',
          en: '<p>CI/CD maturity is measured by the four <strong>DORA</strong> metrics (DevOps Research and Assessment - a multi-year study of thousands of teams): deployment frequency, commit-to-production lead time, change failure rate and time to restore (MTTR). The research conclusions are counterintuitive for management and worth quoting: teams that deploy MORE OFTEN have a LOWER failure rate - because small changes are easy to understand and revert. Fear of deployments indicates a problem, not prudence.</p>' +
            '<h4>Pipeline craft</h4>' +
            '<ul>' +
            '<li><strong>Run time under 10-15 minutes</strong> - beyond that people stop waiting for results and start routing around the process. Dependency and Docker layer caching (lesson 3) is the main lever.</li>' +
            '<li><strong>Protected main</strong>: entry only via PR with green CI and review. The pipeline is the only road to production - an account deploying from a laptop is an audit red flag.</li>' +
            '<li><strong>Rollback rehearsed, not theoretical</strong>: immutable versioned artifacts make it one command. A separate matter: database migrations must be backward compatible (expand-contract), or a code rollback will not undo the schema.</li>' +
            '<li><strong>Feature flags</strong> split deploy from release: code ships dark, you enable it for 1%, 10%, 100% of users without a deploy. They double as the A/B experiment mechanism - and the kill switch when a feature misbehaves.</li>' +
            '</ul>' +
            '<h4>Infrastructure as code</h4>' +
            '<p>If the app has a pipeline, the infrastructure should too. <strong>Terraform</strong> (the most popular IaC tool) describes resources declaratively in .tf files: <code>terraform plan</code> shows the diff between description and reality, <code>terraform apply</code> closes it - recognize the pattern? Desired-state reconciliation again, as in K8s and React. The effect: an infrastructure change (a new queue, a bucket, an IAM permission) goes through PR and review like any code, and staging is rebuilt from the same files as production. Clicking in the console is demoted to looking around.</p>' +
            '<h4>CI/CD for AI apps - your specialty</h4>' +
            '<p>All of the above plus the layer you know from the evals module, wired together here: <strong>the eval suite as a gate</strong> - a prompt, model or RAG parameter change runs against the golden set (e.g. Promptfoo in a CI job) and blocks the merge below a threshold; <strong>canaries for prompts and models</strong> - a new model takes 5% of traffic with quality and cost metrics compared, exactly like a code canary; <strong>flags on models</strong> - the provider/model-version switch as a feature flag gives you a one-second retreat when the new model starts hallucinating in production. In AI Engineer job ads, "integrate with CI/CD" means precisely this: you can wire model quality into the delivery belt.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>One pipeline, one road to production, the artifact built once - everything else is per-environment configuration.</li>' +
            '<li>Invest in run time and rollback before traffic grows; DORA measures exactly what on-call feels like.</li>' +
            '<li>In interviews: distinguish delivery from deployment, describe a canary with automatic retreat and have an eval-gate example for a prompt change ready - the answer that welds this module to the rest of the course.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Na czym polega continuous integration (CI)?',
            en: 'What is continuous integration (CI)?'
          },
          options: [
            { pl: 'Na łączeniu wszystkich mikroserwisów w jeden monolit', en: 'Merging all microservices into one monolith' },
            { pl: 'Na ręcznym testowaniu aplikacji przed każdym wydaniem', en: 'Manually testing the app before every release' },
            { pl: 'Na wdrażaniu na produkcję dokładnie raz w tygodniu', en: 'Deploying to production exactly once a week' },
            { pl: 'Na tym, że każdy push automatycznie odpala build i testy, więc problemy wychodzą w minuty po powstaniu, a main jest zawsze zielony', en: 'Every push automatically triggering build and tests, so problems surface minutes after they are created and main stays green' }
          ],
          correct: 3,
          explain: {
            pl: 'Sednem CI jest automatyzm i częstość: mała zmiana, natychmiastowa weryfikacja. Błąd znaleziony po 5 minutach kosztuje 5 minut; ten sam błąd po dwóch tygodniach na produkcji kosztuje dzień śledztwa.',
            en: 'The essence of CI is automation and frequency: a small change, instant verification. A bug found after 5 minutes costs 5 minutes; the same bug two weeks later in production costs a day of forensics.'
          }
        },
        {
          q: {
            pl: 'Czym różni się continuous delivery od continuous deployment?',
            en: 'What is the difference between continuous delivery and continuous deployment?'
          },
          options: [
            { pl: 'Delivery: każda zielona wersja jest GOTOWA do wydania, ale na produkcję wypuszcza ją człowiek; deployment: zielona wersja jedzie na produkcję w pełni automatycznie', en: 'Delivery: every green build is READY to release but a human pushes it to production; deployment: a green build goes to production fully automatically' },
            { pl: 'Delivery dotyczy frontendu, deployment backendu', en: 'Delivery is for frontend, deployment for backend' },
            { pl: 'To synonimy - oba znaczą dokładnie to samo', en: 'They are synonyms - both mean exactly the same' },
            { pl: 'Delivery wymaga Kubernetes, deployment działa wszędzie', en: 'Delivery requires Kubernetes, deployment works anywhere' }
          ],
          correct: 0,
          explain: {
            pl: 'Różnica to jedna ręczna bramka przed produkcją: w delivery jest, w deployment nie ma. Oba wymagają tego samego fundamentu - pipeline, który utrzymuje każdą wersję w stanie gotowym do wydania.',
            en: 'The difference is one manual gate before production: delivery has it, deployment does not. Both need the same foundation - a pipeline keeping every build in a releasable state.'
          }
        },
        {
          q: {
            pl: 'Co to jest canary release?',
            en: 'What is a canary release?'
          },
          options: [
            { pl: 'Wydawanie nowej wersji tylko w weekendy, gdy ruch jest mały', en: 'Releasing new versions only on weekends, when traffic is low' },
            { pl: 'Skierowanie małego procenta ruchu (np. 5%) na nową wersję i porównywanie jej metryk ze starą - dobre metryki to stopniowy rollout, złe to automatyczny odwrót', en: 'Sending a small percentage of traffic (e.g. 5%) to the new version and comparing its metrics with the old one - good metrics mean gradual rollout, bad ones an automatic retreat' },
            { pl: 'Testowanie wydania wyłącznie na środowisku staging', en: 'Testing the release only on staging' },
            { pl: 'Wdrożenie z żółtym oznaczeniem wersji w rejestrze', en: 'A deploy with a yellow version label in the registry' }
          ],
          correct: 1,
          explain: {
            pl: 'Kanarek ogranicza promień rażenia: regresję widzi 5% użytkowników przez kwadrans, a nie wszyscy przez godzinę. Warunkiem jest monitoring, który umie porównać dwie wersje na żywym ruchu.',
            en: 'The canary limits the blast radius: a regression is seen by 5% of users for fifteen minutes, not everyone for an hour. The precondition is monitoring able to compare two versions on live traffic.'
          }
        },
        {
          q: {
            pl: 'Zespół zmienił system prompt w aplikacji LLM, testy jednostkowe przeszły, wdrożono - a użytkownicy zgłaszają, że asystent przestał trzymać się formatu odpowiedzi. Jaka bramka w CI by to wyłapała?',
            en: 'A team changed the system prompt of an LLM app, unit tests passed, it shipped - and users report the assistant no longer keeps its answer format. Which CI gate would have caught it?'
          },
          options: [
            { pl: 'Dłuższy etap lintowania kodu', en: 'A longer code-linting stage' },
            { pl: 'Skan bezpieczeństwa obrazu Dockera', en: 'A Docker image security scan' },
            { pl: 'Zestaw evali na golden secie (np. Promptfoo w jobie CI): zmiana promptu musi przejść próg jakości na referencyjnych przykładach, zanim pipeline pozwoli na merge i wdrożenie', en: 'An eval suite on the golden set (e.g. Promptfoo in a CI job): a prompt change must clear a quality threshold on reference examples before the pipeline allows merge and deploy' },
            { pl: 'Podniesienie pokrycia testów jednostkowych do 100%', en: 'Raising unit test coverage to 100%' }
          ],
          correct: 2,
          explain: {
            pl: 'Testy jednostkowe nie mierzą jakości odpowiedzi modelu - od tego są evale (moduł 5). Wpięcie golden setu jako bramki w pipeline to dokładnie ten most między światem AI a CI/CD, o który pytają w rekrutacjach na AI Engineera.',
            en: 'Unit tests do not measure model answer quality - evals do (module 5). Wiring the golden set as a pipeline gate is exactly the bridge between the AI world and CI/CD that AI Engineer interviews ask about.'
          }
        }
      ]
    }
  ]
};
