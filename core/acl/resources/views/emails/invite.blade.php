{!! trans('acl::users.email_register_template', ['name' => $data['name'], 'site_title' => setting('site_title'), 'content' => $data['content'], 'link' => route('invite.accept', $data['token'])]) !!}
