<!-- Footer.svelte -->
<script>
  const navigation = [
    { name: 'DASHBOARD', href: '/dashboard' },
    { name: 'ABOUT', href: '/about' },
    { name: 'INNOVATORS', href: '/innovators' },
    { name: 'GLOSSARY', href: '/glossary' },
    { name: 'CONTACT', href: '/contact' }
  ];
</script>

<footer class="bg-gray-50">
  <!-- Main footer content -->
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <!-- Logo and disclaimer -->
      <div class="max-w-md mb-6 md:mb-0">
        <div class="flex items-center space-x-3 mb-4">
          <!-- Logo -->
          <svg width="62" height="71" viewBox="0 0 62 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8854 48.6959H41.5056V70.3161H19.8854V48.6959ZM21.9053 50.7158V68.2961H39.4856V50.7158H21.9053Z" fill="#319187"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4856 48.6959H61.1058V70.3161H39.4856V48.6959ZM41.5056 50.7158V68.2961H59.0858V50.7158H41.5056Z" fill="#319187"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4856 29.0956H61.1058V50.7158L39.4856 50.7158V29.0956ZM41.5056 31.1155V48.6959L59.0858 48.6958V31.1155H41.5056Z" fill="#319187"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6955 19.9093L41.5056 29.6564V50.7158L19.8854 50.7159V29.6564L30.6955 19.9093ZM21.9053 31.1157H39.4856V48.6959L21.9053 48.696V31.1157ZM37.8673 29.0957H23.5237L30.6955 22.6291L37.8673 29.0957Z" fill="#319187"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M50.2957 0.30896L61.1058 10.0561V31.1156L39.4856 31.1157V10.0561L50.2957 0.30896ZM41.5056 11.5154H59.0858V29.0956H41.5056V11.5154ZM57.4675 9.4954H43.1239L50.2957 3.02881L57.4675 9.4954Z" fill="#319187"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0953 39.5094L21.9053 49.2566V70.3161H0.285156V49.2566L11.0953 39.5094ZM2.30512 50.7158L19.8854 50.7159V68.2961H2.30512V50.7158ZM18.267 48.6959H3.92349L11.0953 42.2293L18.267 48.6959Z" fill="#319187"/>
            <path d="M30.9942 33.5786C32.5217 33.5786 33.8142 33.9982 34.8885 34.8543C35.9796 35.7104 36.6174 36.8519 36.8189 38.2787L34.7374 38.4633C34.4017 36.4993 32.9413 35.3579 30.927 35.3579C29.6681 35.3579 28.6609 35.7775 27.9056 36.6168C27.1502 37.4561 26.7641 38.5976 26.7641 40.0244C26.7641 41.4848 27.1502 42.643 27.9391 43.4655C28.7281 44.288 29.7184 44.6909 30.9438 44.6909C32.9413 44.6909 34.3849 43.5998 34.7374 41.703L36.8357 41.8877C36.6007 43.2977 35.946 44.4223 34.8717 45.2448C33.8142 46.0674 32.5217 46.4702 31.0109 46.4702C29.1813 46.4702 27.6705 45.8995 26.4955 44.7413C25.3205 43.583 24.733 42.0219 24.733 40.0244C24.733 38.0269 25.3205 36.4658 26.4787 35.3075C27.637 34.1493 29.1477 33.5786 30.9942 33.5786Z" fill="#319187"/>
            <path d="M55.4528 34.0368V41.708C55.4528 44.9141 53.5057 46.7605 50.2996 46.7605C47.0935 46.7605 45.1463 44.9141 45.1463 41.708V34.0368H47.1438V41.6744C47.1438 43.8398 48.2685 44.9812 50.2996 44.9812C52.3139 44.9812 53.4553 43.823 53.4553 41.6744V34.0368H55.4528Z" fill="#319187"/>
            <path d="M26.2697 53.5631H31.2047C33.4876 53.5631 35.0151 54.7549 35.0151 56.9707C35.0151 58.2296 34.5451 59.1025 33.6051 59.5557C34.7634 59.9418 35.5523 60.9993 35.5523 62.5604C35.5523 64.86 33.9576 66.119 31.6076 66.119H26.2697V53.5631ZM28.2504 55.3256V58.8339H31.2551C32.4133 58.8339 32.9841 58.2632 32.9841 57.105C32.9841 55.9467 32.1951 55.3256 30.9697 55.3256H28.2504ZM28.2504 60.5461V64.3397H31.3726C32.6483 64.3397 33.5044 63.7354 33.5044 62.4597C33.5044 61.1671 32.6483 60.5461 31.4565 60.5461H28.2504Z" fill="#319187"/>
            <path d="M51.3017 66.119H49.3042V53.5631H51.3017V66.119Z" fill="#319187"/>
          </svg>
          
          <div class='mt-2'>
            <h4>
              Canadian Unified Building
            </h4>
            <h4>
              & Innovation Dashboard
            </h4>
          </div>
        </div>
        
        <p class="text-primary-darkgreen text-sm">
          We are a non-profit project powered by behavioral science by 
          <a 
            href="https://thedecisionlab.com" 
            class="text-primary-darkgreen hover:text-primary-teal hover:underline"
          >
            The Decision Lab
          </a>.
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex space-x-6">
        {#each navigation as item}
          <a 
            href={item.href}
            class="font-secondary text-grey-light hover:text-gray-700 text-sm font-medium"
          >
            {item.name}
          </a>
        {/each}
      </nav>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="border-t border-gray-200">
    <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
      <p class="text-grey-light text-sm mb-2 md:mb-0">
        © 2024 The Decision Lab. All Rights Reserved
      </p>
      <div class="flex space-x-6">
        <a 
          href="/terms" 
          class="font-secondary text-grey-light hover:text-gray-700 text-sm"
        >
          Terms and conditions
        </a>
        <a 
          href="/privacy" 
          class="font-secondary text-grey-light hover:text-gray-700 text-sm"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
</footer>