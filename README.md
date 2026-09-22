# Al Nogoum — Bilingual GitHub Pages Website (V4)

موقع Static ثنائي اللغة لشركة **النجوم للتوريدات العمومية والمقاولات**، يعمل على GitHub Pages بدون Database أو Backend.

## الجديد في V4
- تركيب اللوجو الرسمي داخل الموقع.
- ضبط الألوان على هوية اللوجو الكحلي والذهبي.
- إضافة رقم **01093029731** كرقم الهاتف وواتساب الرئيسي.
- رابط واتساب يستخدم الصيغة الدولية **201093029731**.
- تحسين شامل لتجربة الموبايل: أحجام خطوط، Hero، الكروت، الصور، الأقسام والتواصل.
- عربي / English مع RTL/LTR تلقائي.
- إبراز الاستيراد والتصدير بشكل أقوى في الـHero والخدمات ومجالات التنفيذ.
- Section مستقل للاستيراد والتصدير يوضح دورة العمل من المصدر حتى التسليم.
- إمكانية تعديل صورة ونصوص Section الاستيراد والتصدير من لوحة الإدارة.

## نشر الموقع على GitHub Pages
1. أنشئ Repository جديد على GitHub.
2. ارفع **كل الملفات والمجلدات الموجودة داخل هذا المشروع** إلى جذر الـRepository.
3. افتح **Settings → Pages**.
4. اختر **Deploy from a branch**.
5. اختر Branch: `main` وFolder: `/ (root)`.
6. احفظ الإعداد وانتظر أول Deployment.

## الدخول كـ Admin
لو رابط موقعك مثلًا:

`https://USERNAME.github.io/alnogoom-site/`

افتح:

`https://USERNAME.github.io/alnogoom-site/admin.html`

صفحة الإدارة ليست مرتبطة من الواجهة الرئيسية ومضاف لها `noindex`، لكن لأنها Static فهي ليست صفحة Login بكلمة سر. **صلاحية التعديل الحقيقية تأتي من GitHub Token** الذي تدخله وقت النشر فقط.

### أول مرة فقط
أنشئ Fine-grained Personal Access Token على GitHub وحدده للـRepository الخاص بالموقع، وأعطه:

- **Contents: Read and write**

ثم داخل `admin.html` اكتب:
- GitHub Owner: اسم حسابك أو الـOrganization.
- Repository: اسم الريبو.
- Branch: غالبًا `main`.
- Token: التوكن الخاص بك.

الـOwner والـRepository والـBranch يمكن أن يتذكرهم المتصفح. **الـToken لا يتم حفظه.**

## تعديل رقم الهاتف وواتساب
من قسم **التواصل** في لوحة الإدارة:
- `الرقم الظاهر`: مثال `01093029731`.
- `WhatsApp digits`: مثال `201093029731` بدون `+` وبدون صفر البداية.

اضغط **نشر على GitHub**. سيُحدّث `content.json`، وبعدها GitHub Pages يحدث الموقع تلقائيًا.

## تعديل اللوجو والصور والمحتوى
من لوحة الإدارة يمكنك تعديل:
- اللوجو والألوان.
- Hero وAbout بالعربي والإنجليزي.
- الخدمات.
- مجالات التنفيذ / سابقة الأعمال.
- صور الواجهة والمشروعات.
- أرقام الهاتف وواتساب.
- الإيميلات.

الصور الافتراضية للمجالات صور توضيحية للنشاط وليست معروضة على أنها مشروعات فعلية للشركة. يمكن استبدالها بصور أعمال الشركة من لوحة الإدارة.

قسم الاستيراد والتصدير الجديد قابل لتعديل الصورة والعناوين والنقاط الرئيسية من `admin.html`.

## V4 Mobile rebuild

V4 rebuilds the phone layout rather than scaling down the desktop layout. It includes:

- Full-width RTL/LTR hero copy with mobile-safe typography (no Arabic clipping).
- More visible hero photography on phones with a lighter mobile overlay.
- Mobile-specific motion: slow hero image movement, floating capability cards, spinning brand rings and scroll reveals.
- A real WhatsApp SVG icon fixed to the physical bottom-right corner.
- Better mobile header, menu, section spacing, cards, projects and contact layout.
- Cache-busting version parameters on CSS and JavaScript so GitHub Pages serves the updated mobile styles after deployment.

When updating an existing GitHub Pages deployment, replace the existing files with the V4 files and commit/push the changes. The browser should fetch the new CSS/JS automatically because the asset version changed to `4.1.0`.
